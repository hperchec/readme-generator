# API documentation

## Functions

<dl>
<dt><a href="#generate">generate(config)</a> ⇒ <code>Promise.&lt;void&gt;</code></dt>
<dd><p>Writes rendered README markdown to file</p>
</dd>
<dt><a href="#render">render(config)</a> ⇒ <code>Promise.&lt;(string|Error)&gt;</code></dt>
<dd><p>Render README markdown</p>
</dd>
<dt><a href="#processConfig">processConfig(config)</a> ⇒ <code><a href="#Configuration">Configuration</a></code></dt>
<dd><p>Takes a custom config as unique parameter and merges it with the default configuration object.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Configuration">Configuration</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="generate"></a>

## generate(config) ⇒ <code>Promise.&lt;void&gt;</code>
Writes rendered README markdown to file

**Throws**:

- Throws error if render or file writing fails


| Param | Type | Description |
| --- | --- | --- |
| config | [<code>Configuration</code>](#Configuration) | The configuration object |

<a name="render"></a>

## render(config) ⇒ <code>Promise.&lt;(string\|Error)&gt;</code>
Render README markdown

**Returns**: <code>Promise.&lt;(string\|Error)&gt;</code> - Returns the rendered markdown as string or Error thrown when calling `ejs.renderFile` method  

| Param | Type | Description |
| --- | --- | --- |
| config | [<code>Configuration</code>](#Configuration) | Same as generate config but `fileName` and `destFolder` option are just ignored |

<a name="processConfig"></a>

## processConfig(config) ⇒ [<code>Configuration</code>](#Configuration)
Takes a custom config as unique parameter and merges it with the default configuration object.

**Returns**: [<code>Configuration</code>](#Configuration) - Returns the processed configuration  

| Param | Type | Description |
| --- | --- | --- |
| config | [<code>Configuration</code>](#Configuration) | The config object to process |

<a name="Configuration"></a>

## Configuration : <code>object</code>
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [fileName] | <code>string</code> | Output file name: 'README.md' by default. Only for "generate" method |
| [destFolder] | <code>string</code> | Output path, default is process.cwd (project root). Only for "generate" method |
| [templatePath] | <code>string</code> | Template path: default is .docs/readme/template.md |
| [ejsDataPath] | <code>string</code> | Path to EJS data file: default is .docs/readme/data.js |
| [ejsOptions] | <code>object</code> | EJS options: see also https://www.npmjs.com/package/ejs#options |

