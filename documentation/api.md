# API documentation

<a name="module_readme-generator"></a>

## readme-generator : <code>object</code>
From: `@hperchec/readme-generator@3.1.0`

**Example**  
```js
const readmeGenerator = require('@hperchec/readme-generator')
```

* [readme-generator](#module_readme-generator) : <code>object</code>
    * _static_
        * [.generate](#module_readme-generator.generate) ⇒ <code>void</code> \| <code>Promise.&lt;void&gt;</code>
        * [.render](#module_readme-generator.render) ⇒ <code>string</code> \| <code>Promise.&lt;string&gt;</code>
        * [.processConfig](#module_readme-generator.processConfig) ⇒ <code>Configuration</code> \| <code>Promise.&lt;Configuration&gt;</code>
        * [.defaultConfig](#module_readme-generator.defaultConfig) : <code>Configuration</code>
        * [.defaultEjsData](#module_readme-generator.defaultEjsData) : <code>object</code>
            * [.$config](#module_readme-generator.defaultEjsData.$config) : <code>Configuration</code>
            * [.$utils](#module_readme-generator.defaultEjsData.$utils) : <code>object</code>
    * _inner_
        * [~Configuration](#module_readme-generator..Configuration) : <code>object</code>

<a name="module_readme-generator.generate"></a>

### readmeGenerator.generate ⇒ <code>void</code> \| <code>Promise.&lt;void&gt;</code>
Writes rendered README markdown to file

**Returns**: <code>void</code> \| <code>Promise.&lt;void&gt;</code> - Promise is immediately resolved except if a module is async.  
**Throws**:

- Throws error if render or file writing fails


| Param | Type | Description |
| --- | --- | --- |
| config | <code>Configuration</code> \| <code>string</code> | The config object to process. Can be path to config file as string. |
| [options] | <code>object</code> | Options object |
| [options.data] | <code>object</code> | Additionnal data object to merge with default EJS data |

**Example**  
```js
readmeGenerator.generate(config) // => output to README.md file
readmeGenerator.generate('./.docs/readme/config.js') // pass config path
readmeGenerator.generate(config, { data: { foo: 'bar' } }) // pass options
// Async
await readmeGenerator.generate('./.docs/readme/config.js') // async module
await readmeGenerator.generate({
  ejsDataPath: '/path/to/ejs/data.js' // async module
})
```
<a name="module_readme-generator.render"></a>

### readmeGenerator.render ⇒ <code>string</code> \| <code>Promise.&lt;string&gt;</code>
Render README markdown

**Returns**: <code>string</code> \| <code>Promise.&lt;string&gt;</code> - Returns the rendered markdown as string. Promise is immediately resolved except if a module is async.  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Configuration</code> \| <code>string</code> | Same as generate config but `fileName` and `destFolder` option are just ignored |
| [options] | <code>object</code> | Same as generate |

**Example**  
```js
const result = readmeGenerator.render(config)
const result = readmeGenerator.render('./.docs/readme/config.js')
const result = readmeGenerator.render(config, { data: { foo: 'bar' } })
// Async
const result = await readmeGenerator.render('./.docs/readme/config.js') // async module
const result = await readmeGenerator.render({
  ejsDataPath: '/path/to/ejs/data.js' // async module
})
```
<a name="module_readme-generator.processConfig"></a>

### readmeGenerator.processConfig ⇒ <code>Configuration</code> \| <code>Promise.&lt;Configuration&gt;</code>
Takes a custom config as unique parameter and merges it with the default configuration object.

**Returns**: <code>Configuration</code> \| <code>Promise.&lt;Configuration&gt;</code> - Returns the processed configuration. Promise is immediately resolved except if module is async.  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Configuration</code> \| <code>string</code> | The config object to process. Can be path to config file as string. |

**Example**  
```js
readmeGenerator.processConfig({ ... }) // pass object
readmeGenerator.processConfig('./.docs/readme/config.js') // pass path as string
// If module.exports is a promise
await readmeGenerator.processConfig('./.docs/readme/config.js') // async module
```
<a name="module_readme-generator.defaultConfig"></a>

### readmeGenerator.defaultConfig : <code>Configuration</code>
Returns the default configuration object.
This base configuration is used by `processConfig` method and so `generate` and `render` methods.
See also [Configuration](#module_readme-generator..Configuration) defaults.

<a name="module_readme-generator.defaultEjsData"></a>

### readmeGenerator.defaultEjsData : <code>object</code>
Returns the default EJS data object.
This base EJS data object is used by `render` methods and merged with user provided EJS data.


* [.defaultEjsData](#module_readme-generator.defaultEjsData) : <code>object</code>
    * [.$config](#module_readme-generator.defaultEjsData.$config) : <code>Configuration</code>
    * [.$utils](#module_readme-generator.defaultEjsData.$utils) : <code>object</code>

<a name="module_readme-generator.defaultEjsData.$config"></a>

#### defaultEjsData.$config : <code>Configuration</code>
Contains the default configuration by default.
Will be merged with custom configuration when using `generate` or `render` method.

**Example**  
```js
// Access configuration
$config.fileName // => README.md
```
<a name="module_readme-generator.defaultEjsData.$utils"></a>

#### defaultEjsData.$utils : <code>object</code>
Contains the following methods:

- `table`: generates a markdown table
- `asciiTree`: generates an "ASCII" tree
- ... all methods from `markdown-utils` package

> Please check the following package documentations:
> - [markdown-utils](https://github.com/jonschlinkert/markdown-utils)
> - [markdown-table](https://www.npmjs.com/package/markdown-table) (⚠ v1.1.3)
> - [ascii-tree](https://www.npmjs.com/package/ascii-tree)

**Example**  
```js
// Generates a blockquote
$utils.blockquote('This is a blockquote')
// Generates a table
$utils.table([
  [ 'Column 1', 'Column 2' ],
  [ 'Value 1', 'Value 2' ]
])
// Generates an ascii tree
$utils.asciiTree('*.\n**a\n**b\n*...')
```
<a name="module_readme-generator..Configuration"></a>

### readme-generator~Configuration : <code>object</code>
Configuration object definition

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [fileName] | <code>string</code> | Output file name: `README.md` by default. Only for **generate** method |
| [destFolder] | <code>string</code> | Output path, default is `process.cwd` (project root). Only for **generate** method |
| [templatePath] | <code>string</code> | Template path: default is `.docs/readme/template.md` |
| [ejsDataPath] | <code>string</code> | Path to EJS data file: default is `.docs/readme/data.js`. If null, no file will be required |
| [ejsOptions] | <code>object</code> | EJS options: see also [EJS documentation](https://www.npmjs.com/package/ejs#options). |
| [ejsOptions.root] | <code>Array.&lt;string&gt;</code> | The path of template folder is automatically included. |
| [ejsOptions.views] | <code>Array.&lt;string&gt;</code> | The path of template folder and the path of internal partials are automatically included. |
| [appendAutoGenMessage] | <code>boolean</code> | If true, append "don't edit" message to rendered markdown. Default is **true**. |
| [autoToc] | <code>boolean</code> | If true, parse `<!-- toc -->` special comment to automatically inject generated table of contents. Default is **true**. The `markdown-toc` package is used for this feature, check the [documentation](https://www.npmjs.com/package/markdown-toc). |
| [slugify] | <code>function</code> | If provided, will be used by `markdown-toc` to slugify headings id. Default uses `github-slugger` (⚠ v1.5.0): see [**slug** method documentation](https://github.com/Flet/github-slugger#usage). |

