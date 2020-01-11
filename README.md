<center><img src="./static/readme.png" width="800" /></center>

# ui-diff

The tool for frontend screenshot testing

## How to use it

### 1. Create a new project on app.ui-diff.com

### 2. Install dependency with yarn or npm

    yarn add ui-diff

### 3. Supply configuration files (in project root)

These can be downloaded at app.ui-diff.com/documentation

1. ui-diff-config.js
2. ui-diff-pages.js

### 4. Update configuration files

ui-diff.config.js
1. Add your environments
2. Add project API-token

ui-diff-pages.js
1. Add the pages you want to test

### 5. Run screenshot tests

    yarn screenshots

## Built using

- 📸 [puppeteer](https://pptr.dev/)
- 🌐 [ora](https://github.com/sindresorhus/ora)
- ⚙️ [minimist](https://github.com/substack/minimist)
- ⚡️ [axios](https://github.com/axios/axios)

## Contributors

[Albin Groen](https://github.com/albingroen)