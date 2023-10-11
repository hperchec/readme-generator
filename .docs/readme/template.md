<%#

    // src/readme.md

    // README.md template (ejs syntax)

-%>
# @hperchec/readme-generator

[![author](https://img.shields.io/static/v1?label=&message=Author:&color=black)
![herve-perchec](http://herve-perchec.com/badge.svg)](http://herve-perchec.com/)

[![package](https://img.shields.io/npm/v/<%= pkg.name %>?logo=npm)](<%= packageUrl %>)
[![downloads](https://img.shields.io/npm/dw/<%= pkg.name %>?logo=npm)](<%= packageUrl %>)
[![issues](https://img.shields.io/github/issues/open/<%= projectPath %>?gitlab_url=https%3A%2F%2Fgitlab.com)](<%= issuesUrl %>)
![license](https://img.shields.io/github/license/<%= projectPath %>?gitlab_url=https%3A%2F%2Fgitlab.com)

> Please consider following this project's author, [Hervé Perchec](https://github.com/hperchec), and consider starring the project to show your ❤ and support.

❔ **Why**

This project is an alternative of [verb](https://www.npmjs.com/package/verb).
It is partially inspired from and sounds like a "lightweight" version specially designed for README.md file.

👇 **Table of contents:**

<!-- toc -->

## 🚀 Get started

Install package via npm

``` bash
npm install -D <%= pkg.name %>
```

Initialize

``` bash
readme-generator init
# Or use npx
npx readme-generator init
```

This will create a `<%= defaultInitTargetRelativePath %>` folder at the root of your project

```
<%- $utils.asciiTree(
`*<your_project_root>
**...
**.docs
***readme
****config.js
****data.js
****template.md
**...
`) %>
```

Add a script to your `package.json` file:

```bash
{
  "scripts": {
    # 'npm run readme' will generates your README.md file
    "readme": "readme-generator --config <%= defaultInitTargetRelativePath %>/config.js",
    # ...
  }
}
```

## ⚙ Configuration

You can pass custom configuration in the `<%= defaultInitTargetRelativePath %>/config.js` file (all keys are optional).

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

Export your (ejs) data in the `<%= defaultInitTargetRelativePath %>/data.js` file.

The exported data object will be merged into default passed to EJS. See also the EJS data relative [documentation](./documentation/api.md).

**Example**:

```js
/**
 * .docs/readme/data.js
 */

// Import package.json data
const pkg = require('../../package.json')
// Repository URL
const repositoryUrl = pkg.repository.url
// Get dependencies
const dependencies = pkg.dependencies || {}
// Get dev dependencies
const devDependencies = pkg.devDependencies || {}

/**
 * Export data for readme file templating
 */
module.exports = {
  pkg,
  repositoryUrl,
  dependencies,
  devDependencies
  /* ... */
}
```

### Template

Make your own template in `<%= defaultInitTargetRelativePath %>/template.md` file.

**Example**:

```markdown
<%%# 
  README.md template
-%>

# Awesome project!

👇 **Table of contents:**

<\!-- toc -->

## Get started

Clone this [repository](<%%= repositoryUrl %>) and install via `npm install`

## Dependencies

<details>

<summary>Global</summary>

<%%-
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

The `<\!-- toc -->` special comment will be replaced by auto-generated table of contents. See configuration documentation.

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

<summary>Dev</summary>

<%-
  include('common/table.md', {
    options: [
      ['name', 'version'],
      ...(Object.entries(devDependencies))
    ]
  })
%>

</details>

<details>

<summary>Peer</summary>

<%-
  include('common/table.md', {
    options: [
      ['name', 'version'],
      ...(Object.entries(peerDependencies))
    ]
  })
%>

</details>

## 🧪 Next features

- presets ? (GitHub/GitLab)

## 🤝 Contributing

> Please check the [contribution guide](./CONTRIBUTING.md)

## 🎖 License

<%= license %>

----

Made with ❤ by Hervé Perchec <herve.perchec@gmail.com>
