# API documentation

<a name="module_readme-generator"></a>

## readme-generator : <code>object</code>
From: @hperchec/readme-generator@2.0.0-beta.1

**Example**  
```js
const readmeGenerator = require('@hperchec/readme-generator')
```

* [readme-generator](#module_readme-generator) : <code>object</code>
    * _static_
        * [.generate](#module_readme-generator.generate) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.render](#module_readme-generator.render) ⇒ <code>Promise.&lt;(string\|Error)&gt;</code>
        * [.processConfig](#module_readme-generator.processConfig) ⇒ <code>Configuration</code>
        * [.defaultConfig](#module_readme-generator.defaultConfig) : <code>Configuration</code>
        * [.defaultEjsData](#module_readme-generator.defaultEjsData) : <code>object</code>
            * [.$utils](#module_readme-generator.defaultEjsData.$utils) : <code>object</code>
    * _inner_
        * [~Configuration](#module_readme-generator..Configuration) : <code>object</code>

<a name="module_readme-generator.generate"></a>

### readmeGenerator.generate ⇒ <code>Promise.&lt;void&gt;</code>
Writes rendered README markdown to file

**Throws**:

- Throws error if render or file writing fails


| Param | Type | Description |
| --- | --- | --- |
| config | <code>Configuration</code> | The configuration object |

**Example**  
```js
const result = await readmeGenerator.generate({
  // Your options
  // ...
})
// => output to README.md file
```
<a name="module_readme-generator.render"></a>

### readmeGenerator.render ⇒ <code>Promise.&lt;(string\|Error)&gt;</code>
Render README markdown

**Returns**: <code>Promise.&lt;(string\|Error)&gt;</code> - Returns the rendered markdown as string or Error thrown when calling `ejs.renderFile` method  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Configuration</code> | Same as generate config but `fileName` and `destFolder` option are just ignored |

**Example**  
```js
const result = await readmeGenerator.render({
  // Your options
  // ...
})
```
<a name="module_readme-generator.processConfig"></a>

### readmeGenerator.processConfig ⇒ <code>Configuration</code>
Takes a custom config as unique parameter and merges it with the default configuration object.

**Returns**: <code>Configuration</code> - Returns the processed configuration  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>Configuration</code> | The config object to process |

**Example**  
```js
const processedConfig = await readmeGenerator.processConfig({
  // Your config
  // ...
})
// => returns the processed config object
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

<a name="module_readme-generator.defaultEjsData.$utils"></a>

#### defaultEjsData.$utils : <code>object</code>
Contains all methods from `markdown-utils` package plus the following:

- `table`: from `markdown-table` package
- `asciiTree`: from `ascii-tree` package, see documentation: https://www.npmjs.com/package/ascii-tree

<a name="module_readme-generator..Configuration"></a>

### readme-generator~Configuration : <code>object</code>
Configuration object definition

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [fileName] | <code>string</code> | Output file name: 'README.md' by default. Only for "generate" method |
| [destFolder] | <code>string</code> | Output path, default is process.cwd (project root). Only for "generate" method |
| [templatePath] | <code>string</code> | Template path: default is .docs/readme/template.md |
| [ejsDataPath] | <code>string</code> | Path to EJS data file: default is .docs/readme/data.js |
| [ejsOptions] | <code>object</code> | EJS options: see also https://www.npmjs.com/package/ejs#options. Default "root" option contains your template folder path. |
| [appendDontEditMessage] | <code>boolean</code> | If true, append "don't edit" message to rendered markdown. Default is true. |
| [autoToc] | <code>boolean</code> | If true, parse `<!-- toc -->` special comment to automatically inject generated table of contents. Default is true. |

