# @hperchec/readme-generator

[![author](https://img.shields.io/static/v1?label=&message=Author:&color=black)
![herve-perchec](http://herve-perchec.com/badge.svg)](http://herve-perchec.com/)

[![package](https://img.shields.io/npm/v/@hperchec/readme-generator?logo=npm)](https://www.npmjs.com/package/@hperchec/readme-generator)
[![downloads](https://img.shields.io/npm/dw/@hperchec/readme-generator?logo=npm)](https://www.npmjs.com/package/@hperchec/readme-generator)
[![issues](https://img.shields.io/github/issues/open/https://github.com/herveperchec/readme-generator?gitlab_url=https%3A%2F%2Fgitlab.com)](https://github.com/herveperchec/readme-generator/issues)
![license](https://img.shields.io/github/license/https://github.com/herveperchec/readme-generator?gitlab_url=https%3A%2F%2Fgitlab.com)

> Please consider following this project's author, [Hervé Perchec](https://github.com/hperchec), and consider starring the project to show your ❤ and support.

❔ **Why**

This project is an alternative of [verb](https://www.npmjs.com/package/verb).
It is partially inspired from and sounds like a "lightweight" version specially designed for README.md file.

👇 **Table of contents:**

- [🚀 Get started](#%F0%9F%9A%80-get-started)
- [⚙ Configuration](#%E2%9A%99-configuration)
- [🧩 EJS template](#%F0%9F%A7%A9-ejs-template)
  - [Data](#data)
  - [Template](#template)
- [🦾 API](#%F0%9F%A6%BE-api)
- [⏫ Migrate from v1](#%E2%8F%AB-migrate-from-v1)
- [🧱 Dependencies](#%F0%9F%A7%B1-dependencies)
- [🤝 Contributing](#%F0%9F%A4%9D-contributing)
- [🎖 License](#%F0%9F%8E%96-license)

## 🚀 Get started

Install package via npm

``` bash
npm install -D @hperchec/readme-generator
```

Initialize

``` bash
readme-generator init
# Or use npx
npx readme-generator init
```

This will create a `./.docs/readme` folder at the root of your project

```
<your_project_root>
├─ ...
├─ .docs
│  └─ readme
│     ├─ config.js
│     ├─ data.js
│     └─ template.md
└─ ...
```

Add a script to your `package.json` file:

```bash
{
  "scripts": {
    # Other scripts...
    # 'npm run readme' will generates your README.md file
    "readme": "readme-generator --config ./.docs/readme/config.js"
  }
}
```

## ⚙ Configuration

You can pass custom configuration in the `./.docs/readme/config.js` file (all keys are optional):

```js
module.exports = {
  /**
   * Output file name: 'README.md' by default
   */
  fileName: 'README.md',
  /**
   * Output path, default is process.cwd() (project root)
   */
  destFolder: path.resolve(__dirname, '../../'),
  /**
   * Template path: default is ./.docs/readme/template.md
   */
  templatePath: path.resolve(__dirname, './template.md'),
  /**
   * Path to EJS data file: default is ./.docs/readme/data.js
   */
  ejsDataPath: path.resolve(__dirname, './data.js'),
  /**
   * EJS options: see also https://www.npmjs.com/package/ejs#options
   */
  ejsOptions: { /* ... */ }
}
```

## 🧩 EJS template

This library uses [EJS](https://ejs.co/) as template engine.

### Data

Export your (ejs) data in `./.docs/readme/data.js` file:

```js
'use strict'

// Dependencies
const markdownTable = require('markdown-table')

// Based on the package.json file, get some data and informations
const packageJson = require('../package.json')
// Get dependencies
const dependencies = packageJson.dependencies
// Get dev dependencies
const devDependencies = packageJson.devDependencies
// Homepage
const homepage = packageJson.homepage
// Repository URL
const repositoryUrl = packageJson.repository.url

// Output a markdown formatted table from a js object
// Like:
// |name|version|
// |----|-------|
// |    |       |
function mdDependencies (deps) {
  return markdownTable([
    ['name', 'version'],
    ...(Object.entries(deps))
  ])
}

/**
 * Export data for readme file templating
 */
module.exports = {
  projectUrl: homepage,
  repositoryUrl: repositoryUrl,
  dependencies: mdDependencies(dependencies),
  devDependencies: mdDependencies(devDependencies)
  /* ... */
}

```

### Template

And use it in your `./.docs/readme/template.md` file:

```markdown
# Awesome project!

[![pipeline status](<%= projectUrl %>badges/master/pipeline.svg)](<%= projectUrl %>commits/master)

🌎 Translated

## Get started

Clone this [repository](<%= repositoryUrl %>) and install via `npm install`

## Dependencies

<details>

<summary>Global</summary>

<%= dependencies %>

</details>


<details>

<summary>Dev</summary>

<%= devDependencies %>

</details>

```

GO

```bash
npm run readme
```

Enjoy! 👍

## 🦾 API

Consult the [API documentation](./documentation/api.md)

## ⏫ Migrate from v1

> All configuration keys are now **optional**

The following have been renamed:

- `outputName` to `fileName`
- `outputPath` to `destFolder`

## 🧱 Dependencies

<details>

<summary>Global</summary>

| name           | version |
| -------------- | ------- |
| colors         | ^1.4.0  |
| ejs            | ^3.1.9  |
| execa          | ^5.1.1  |
| fs-extra       | ^11.1.1 |
| lodash.merge   | ^4.6.2  |
| markdown-table | ^1.1.3  |
| markdown-toc   | ^1.2.0  |
| markdown-utils | ^1.0.0  |
| yargonaut      | ^1.1.4  |
| yargs          | ^17.7.2 |

</details>

<details>

<summary>Dev</summary>

| name                          | version  |
| ----------------------------- | -------- |
| @hperchec/jsdoc-plugin-define | ^1.0.1   |
| ascii-tree                    | ^0.3.0   |
| conventional-changelog-cli    | ^4.1.0   |
| cross-env                     | ^7.0.3   |
| eslint                        | ^8.51.0  |
| eslint-config-standard        | ^17.1.0  |
| eslint-plugin-disable         | ^2.0.3   |
| eslint-plugin-import          | ^2.28.1  |
| eslint-plugin-jsdoc           | ^46.8.2  |
| eslint-plugin-node            | ^11.1.0  |
| eslint-plugin-promise         | ^6.1.1   |
| eslint-plugin-standard        | ^4.1.0   |
| jsdoc-to-markdown             | ^8.0.0   |
| npm-check-updates             | ^16.14.5 |

</details>

<details>

<summary>Peer</summary>

| name | version |
| ---- | ------- |

</details>

## 🤝 Contributing

> Please check the [contribution guide](./CONTRIBUTING.md)

## 🎖 License

ISC

----

Made with ❤ by Hervé Perchec <herve.perchec@gmail.com>

----

*This file was generated by [@hperchec/readme-generator](https://www.npmjs.com/package/@hperchec/readme-generator). Don't edit it.*
