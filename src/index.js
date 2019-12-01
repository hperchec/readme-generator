/**
 * @hperchec/readme-generator [/src/index.js]
 * @file Entry point to generate readme file
 * @author Hervé Perchec <herve.perchec@gmail.com>
 */

'use strict'

// Dependencies
const merge = require('lodash.merge')
const path = require('path')
const ejs = require('ejs')
const fs = require('fs')
const colors = require('colors') // eslint-disable-line no-unused-vars

// GO

module.exports = function (config) {
  // Some console outputs
  console.log('- Auto-generating README.md file')
  console.log('- Based on: "' + (config.templatePath).yellow + '" template file')
  console.log('- Syntax: ' + 'ejs'.yellow)

  // Data
  const data = require(config.ejsDataPath)
  // Use ejs to template README file
  // Merge with user data
  const ejsData = merge({
    // Default data...
  }, data)

  // Await for ejs renderFile response
  ejs.renderFile(config.templatePath, ejsData, config.ejsOptions).then((content) => {
    // Success
    try {
      // Try to write file (synchronous)
      fs.writeFileSync(path.join(config.outputPath, config.outputName), content)
      // Log success
      console.log('- Status:', '✔ OK'.green)
      console.log('- Exported to: "' + (path.join(config.outputPath, config.outputName)).cyan + '"')
    } catch (error) {
      // Log fail and throw error
      console.log('- Status:', '✘ FAILED'.red)
      throw error
    }
  }).catch((error) => {
    // Catch and throw error
    console.log('- Status:', '✘ FAILED'.red)
    throw error
  })
}
