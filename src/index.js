/**
 * @module readme-generator
 * @description
 * @hperchec/readme-generator [/src/index.js]
 * @file Entry point to generate readme file
 * @author Hervé Perchec <herve.perchec@gmail.com>
 */

'use strict'

/**
 * @typedef Configuration
 * @type {object}
 * @property {string} fileName - Output file name: 'README.md' by default. Only for "generate" method)
 * @property {string} destFolder - Output path, default is process.cwd (project root). Only for "generate" method
 * @property {string} templatePath - Template path: default is .docs/readme/template.md
 * @property {string} ejsDataPath -  Path to EJS data file: default is .docs/readme/data.js
 * @property {object} ejsOptions - EJS options: see also https://www.npmjs.com/package/ejs#options
 */

// Dependencies
const merge = require('lodash.merge')
const path = require('path')
const ejs = require('ejs')
const fs = require('fs')
const colors = require('colors') // eslint-disable-line no-unused-vars

// Constants
const { DEFAULT_INIT_TARGET_RELATIVE_PATH } = require('./constants')

/**
 * Exports
 */

exports.generate = generate
exports.render = render
exports.processConfig = processConfig

/**
 * @alias module:readme-generator.defaultConfig
 * @type {Configuration}
 */
const defaultConfig = exports.defaultConfig = {
  fileName: 'README.md',
  destFolder: process.cwd(),
  templatePath: path.resolve(process.cwd(), DEFAULT_INIT_TARGET_RELATIVE_PATH, 'template.md'),
  ejsDataPath: path.resolve(process.cwd(), DEFAULT_INIT_TARGET_RELATIVE_PATH, 'data.js'),
  ejsOptions: {}
}

/**
 * @type {string}
 */
exports.defaultInitTargetRelativePath = DEFAULT_INIT_TARGET_RELATIVE_PATH

/**
 * @async
 * @param {Configuration} config - The configuration object
 * @returns {void}
 * @description
 * Writes rendered README markdown to file
 */
async function generate (config) {
  // First, parse custom config
  const processedConfig = processConfig(config)
  // Target file path
  const targetFilePath = path.join(processedConfig.destFolder, processedConfig.fileName)

  // Some console outputs
  console.log(`Auto-generating "${processedConfig.fileName}" file`)
  console.log()
  console.log('- Syntax: ' + 'ejs'.yellow)

  // Render markdown
  const renderResult = await render(processedConfig)

  // Check render result
  // If error
  if (renderResult instanceof Error) {
    // Catch and throw error
    console.log('- Status:', '✘ FAILED'.red)
    throw renderResult
  // Else, everything is okay
  } else {
    try {
      // Try to write file (synchronous)
      fs.writeFileSync(targetFilePath, renderResult)
    } catch (error) {
      // Log fail and throw error
      console.log('- Status:', '✘ FAILED'.red)
      throw error
    }
    // Log success
    console.log('- Status:', '✔ OK'.green)
    console.log('- Written to: "' + (targetFilePath).cyan + '"')
    console.log()
  }
}

/**
 * @async
 * @param {Configuration} config - Same as generate config but `fileName` and `destFolder` option are just ignored
 * @returns {Promise<string|Error>} - Returns the rendered markdown as string or Error thrown when calling `ejs.renderFile` method
 * @description
 * Render README markdown
 */
async function render (config) {
  // First, parse custom config
  const processedConfig = processConfig(config)

  // Data
  const data = require(processedConfig.ejsDataPath)
  // Use ejs to template README file
  // Merge with user data
  const ejsData = merge({
    // Default data...
  }, data)

  // Await for ejs renderFile response
  const content = await ejs.renderFile(processedConfig.templatePath, ejsData, processedConfig.ejsOptions)
  // If error
  if (content instanceof Error) {
    // Return error
    return content
  // Else, everything is okay
  } else {
    // EJS response is valid
    // console.log('content : ', content)

    // content += '\n' + epilogue

    return content
  }
}

/**
 * @param {Configuration} config - The config object to process
 * @returns {Configuration} - Returns the processed configuration
 * @description
 * Takes a custom config as unique parameter and merges it with the default configuration object.
 */
function processConfig (config) {
  const result = {}
  result.fileName = config.fileName || defaultConfig.fileName
  result.destFolder = config.destFolder || defaultConfig.destFolder
  result.templatePath = config.templatePath || defaultConfig.templatePath
  result.ejsDataPath = config.ejsDataPath || defaultConfig.ejsDataPath
  result.ejsOptions = config.ejsOptions || defaultConfig.ejsOptions
  return result
}
