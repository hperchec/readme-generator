

<h1>@hperchec/readme-generator</h1>

- [Get started](#get-started)
- [Configure](#configure)
  - [Configuration](#configuration)
  - [Data (ejs)](#data-ejs)
  - [Template](#template)
- [Dependencies](#dependencies)
- [License](#license)

## Get started

Install via npm

``` bash
npm install @hperchec/readme-generator
```

Initialize

``` bash
readme-generator init
# Or use npx
npx readme-generator init
```

This will create a `readme` folder at the root of your project

```
<your_project_root>
├─ ...
├─ readme
│  ├─ config.js
│  ├─ readme.js
│  └─ template.md
└─ ...
```

Add a script to your `package.json` file:

```bash
{
  "scripts": {
    # Other scripts...
    # 'npm run readme' will generates your README.md file
    "readme": "readme-generator --config ./readme/config.js"
  }
}
```

## Configure

### Configuration

Find configuration in `readme/config.js` file:

```javascript
{
  // Template path
  templatePath: path.resolve(__dirname, './template.md'), // Default template file
  // Output path
  outputPath: path.resolve(__dirname, '../'), // Your project root directory by default
  // Output file name
  outputName: 'README.md', // 'README.md' by default
  // Path to ejs data file
  ejsDataPath: path.resolve(__dirname, './readme.js'), // Default template ejs data file
  // EJS options (see https://www.npmjs.com/package/ejs#options)
  ejsOptions: {
    /* your ejs options... */
  }
}
```

### Data (ejs)

Export your (ejs) data in `readme/readme.js` file:

```javascript
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

And use it in your `readme/template.md` file:

> ***NOTE***: Note that the extension is .md to ease code reading with a text editor like Visual Studio Code

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

## Dependencies

<details>
<summary>Global</summary>

| name         | version |
| ------------ | ------- |
| colors       | ^1.4.0  |
| ejs          | ^3.0.1  |
| lodash.merge | ^4.6.2  |
| yargonaut    | ^1.1.4  |
| yargs        | ^15.0.2 |

</details>

<details>
<summary>Dev</summary>

| name                   | version |
| ---------------------- | ------- |
| ascii-tree             | ^0.3.0  |
| cross-env              | ^6.0.3  |
| eslint                 | ^6.7.2  |
| eslint-config-standard | ^14.1.0 |
| eslint-plugin-import   | ^2.18.2 |
| eslint-plugin-node     | ^10.0.0 |
| eslint-plugin-promise  | ^4.2.1  |
| eslint-plugin-standard | ^4.0.1  |
| markdown-table         | ^1.1.3  |

</details>

## License

Developed with ❤ by Hervé Perchec <herve.perchec@gmail.com>
