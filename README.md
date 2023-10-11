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

- [🚀 Get started](#-get-started)
- [⚙ Configuration](#-configuration)
- [🧩 EJS template](#-ejs-template)
  - [Data](#data)
  - [Template](#template)
    - [Built-in EJS partials](#built-in-ejs-partials)
- [🌠 Generate README](#-generate-readme)
- [🦾 API](#-api)
- [⏫ Migrate from v1](#-migrate-from-v1)
- [🧱 Dependencies](#-dependencies)
- [🧪 Next features](#-next-features)
- [🤝 Contributing](#-contributing)
- [🎖 License](#-license)

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
    # 'npm run readme' will generates your README.md file
    "readme": "readme-generator --config ./.docs/readme/config.js",
    # ...
  }
}
```

## ⚙ Configuration

You can pass custom configuration in the `./.docs/readme/config.js` file (all keys are optional).

**Example**:

```js
/**
 * .docs/readme/config.js
 */

module.exports = {
  /**
   * Output file name: 'README.md' by default
   */
  fileName: 'README.md'
}
```

> ❕ **NOTE**: Please check also the [documentation](./documentation/api.md) to learn more about configuration.

## 🧩 EJS template

This library uses [EJS](https://ejs.co/) as template engine.

### Data

Export your (ejs) data in the `./.docs/readme/data.js` file.

The exported data object will be merged into default passed to EJS. See also the EJS data relative [documentation](./documentation/api.md).

**Example**:

```js
/**
 * .docs/readme/data.js
 */

// Import package.json data
const pkg = require('../../package.json')
const repositoryUrl = pkg.repository.url
const dependencies = pkg.dependencies || {}
const devDependencies = pkg.devDependencies || {}

/**
 * Export data for readme file templating
 */
module.exports = {
  pkg,
  repositoryUrl,
  dependencies,
  devDependencies
}
```

### Template

Make your own template in `./.docs/readme/template.md` file.

**Example**:

```markdown
<%# 
  README.md template
-%>
# Awesome project!

👇 **Table of contents:**

<!-- toc -->

## Get started

Clone this [repository](<%= repositoryUrl %>) and install via `npm install`

## Dependencies

<details>

<summary>Global</summary>

<%-
  include('common/table.md', {
    options: [
      ['name', 'version'],
      ...(Object.entries(dependencies))
    ]
  })
%>

</details>

<details>
```

The `<!-- toc -->` special comment will be replaced by auto-generated table of contents. See configuration documentation.

> ❕ **NOTE**: You can escape special toc comment by adding a backslash before the exclamation point "!" like: `<\!--`.

#### Built-in EJS partials

There are some partials used by default with EJS:

- `common/table.md`: render a table with `markdown-table` package

## 🌠 Generate README

```bash
npm run readme
```

Enjoy! 👍

> ❕ **NOTE**: The README file will be overwritten every time the command is runned.

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
| github-slugger | ^1.5.0  |
| lodash.merge   | ^4.6.2  |
| markdown-table | ^1.1.3  |
| markdown-toc   | ^1.2.0  |
| markdown-utils | ^1.0.0  |
| prompts        | ^2.4.2  |
| yargonaut      | ^1.1.4  |
| yargs          | ^17.7.2 |

</details>

<details>

<summary>Dev</summary>

| name                            | version  |
| ------------------------------- | -------- |
| @commitlint/cli                 | ^17.7.2  |
| @commitlint/config-conventional | ^17.7.0  |
| @hperchec/jsdoc-plugin-define   | ^1.0.1   |
| ascii-tree                      | ^0.3.0   |
| conventional-changelog-cli      | ^4.1.0   |
| cross-env                       | ^7.0.3   |
| eslint                          | ^8.51.0  |
| eslint-config-standard          | ^17.1.0  |
| eslint-plugin-disable           | ^2.0.3   |
| eslint-plugin-import            | ^2.28.1  |
| eslint-plugin-jsdoc             | ^46.8.2  |
| eslint-plugin-node              | ^11.1.0  |
| eslint-plugin-promise           | ^6.1.1   |
| eslint-plugin-standard          | ^4.1.0   |
| jsdoc-to-markdown               | ^8.0.0   |
| lint-staged                     | ^14.0.1  |
| npm-check-updates               | ^16.14.5 |
| simple-git-hooks                | ^2.9.0   |

</details>

<details>

<summary>Peer</summary>

| name | version |
| ---- | ------- |

</details>

## 🧪 Next features

- presets ? (GitHub/GitLab)

## 🤝 Contributing

> Please check the [contributing guidelines](./CONTRIBUTING.md)

## 🎖 License

ISC

----

Made with ❤ by [Hervé Perchec](https://github.com/hperchec)

----

*README.md - this file was auto generated with [@hperchec/readme-generator](https://www.npmjs.com/package/@hperchec/readme-generator). Don't edit it.*
