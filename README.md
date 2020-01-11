<center><img src="./static/readme.png" width="800" /></center>

# ui-diff

🖼 The tool for frontend screenshot testing

## How to use it

### 1. Create a new project on ui-diff

[app.ui-diff.com/login](https://ui-diff-frontend.now.sh/new-project)

### 2. Install dependency with yarn or npm

    yarn add ui-diff

### 3. Supply configuration files (in project root)

<strong>These can be downloaded at app.ui-diff.com/documentation</strong>

### 4. Update configuration files

<strong>ui-diff-config.js</strong>
1. Add your environments
2. Add project API-token

<strong>ui-diff-pages.js</strong>
1. Add the pages you want to test

### 5. Run screenshot tests

    yarn screenshots

## Built using

- 📸 [puppeteer](https://pptr.dev/)
- 🌐 [ora](https://github.com/sindresorhus/ora)
- ⚙️ [minimist](https://github.com/substack/minimist)
- ⚡️ [axios](https://github.com/axios/axios)

## Contributors

[<img alt="albingroen" src="https://avatars2.githubusercontent.com/u/19674362?v=4&s=117" width=117>](https://github.com/albingroen) |
:---:|
[albingroen](https://github.com/albingroen)|