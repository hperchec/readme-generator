/**
 * @hperchec/readme-generator [/src/config.js]
 * @file @hperchec/readme-generator configuration file
 * @author Hervé Perchec <herve.perchec@gmail.com>
 */

'use strict'

// Dependencies
const path = require('path')

// Export configuration
module.exports = {
  // Template path
  templatePath: path.resolve(__dirname, './template.md'),
  // Output path
  outputPath: path.resolve(__dirname, '../'),
  // Output file name
  outputName: 'README.md',
  // Path to ejs data file
  ejsDataPath: path.resolve(__dirname, './readme.js')
}
