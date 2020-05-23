#! /usr/bin/env node
const puppeteer = require("puppeteer");
const axios = require("axios");
const ora = require("ora");
const pages = require("../../ui-diff-pages");
const config = require("../../ui-diff-config");

// Parsed command line args
const args = require("minimist")(process.argv.slice(2));

// Find out if to launch headless or headful
const headless =
  !args.headless || args.headless === "true" || args.headless === true;

// Main function
async function main() {
  process.setMaxListeners(Infinity);

  // Launch headless/headful browser
  const browser = await puppeteer.launch({
    headless
  });

  // Initate progress bar
  const spinner = ora(
    `Spinning up head${headless ? "less" : "ful"} browser`
  ).start();

  // Keep track of amount of pages screenshotted
  let progress = 0;

  // Async function for taking a screenshot
  async function run(url, name, variant, actions) {
    const page = await browser.newPage();

    // Set browser dimensions for screenshot
    const sizes = {
      phone: {
        width: 375,
        height: 812
      },
      tablet: {
        width: 768,
        height: 1024
      },
      computer: {
        width: 1920,
        height: 1080
      }
    };

    await page.setViewport(
      args.size ? sizes[args.size] || sizes.computer : sizes.computer
    );

    // Go to page and if fails close browser
    try {
      await page.goto(url, { timeout: 0, waitUntil: "networkidle2" });
    } catch (e) {
      browser.close();
    }

    // Take screenshot and close page. On last page also close browser
    try {
      if (actions) {
        const runPossibleEvent = async (element, event, value) => {
          const events = {
            click: await element.click(),
            type: await element.type(value || "")
          };

          return events[event];
        };

        actions.forEach(async action => {
          const element = await page.$(action.element);
          if (element) {
            await runPossibleEvent(element, action.event, action.value);
          }
        });
      }

      await page
        .screenshot({
          encoding: "binary",
          fullPage: true,
          type: "jpeg",
          quality: 65
        })
        .then(imageBuffer => {
          progress = progress + 1;
          page.close().then(async () => {
            // Update spinner
            spinner.text = `Taking screenshots [${progress}/${pages.length *
              (args.env ? 1 : 2)}]`;

            // Upload image to ui-diff
            await axios.post(
              "https://ui-diff-api.herokuapp.com/projects/images",
              { image: imageBuffer, env: variant, name },
              { headers: { "api-token": config.token } }
            );

            // On last page close browser and stop spinner
            if (progress === pages.length * (!args.env ? 2 : 1)) {
              browser
                .close()
                .then(() => {
                  spinner.stop();
                  // eslint-disable-next-line no-console
                  console.log("Results available on https://app.ui-diff.com/");
                })
                .catch(e => {
                  // eslint-disable-next-line no-console
                  console.error(e);
                });
            }
          });
        });
    } catch (e) {
      browser.close();
    }
  }

  const envs = config.envs;

  if (!args.env || !envs[args.env]) {
    // Screenshot pages on localhost
    pages.forEach(p => {
      run(`${envs.local}${p.path}`, p.name, "local", p.actions);
    });

    // Screenshot pages on live
    pages.forEach(p => {
      run(`${envs.live}${p.path}`, p.name, "live", p.actions);
    });
  } else {
    pages.forEach(p => {
      run(`${envs[args.env]}${p.path}`, p.name, args.env, p.actions);
    });
  }
}

main();
