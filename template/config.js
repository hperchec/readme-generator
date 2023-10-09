/**
 * @hperchec/readme-generator Example configuration file
 */

'use strict'

// Dependencies
const path = require('path')

// Export configuration
module.exports = {
  // Template path
  templatePath: path.resolve(__dirname, './template.md'), // Default template file
  // Output path
  outputPath: path.resolve(__dirname, '../'), // Your project root directory by default
  // Output file name
  outputName: 'README.md', // 'README.md' by default
  // Path to ejs data file
  ejsDataPath: path.resolve(__dirname, './data.js'), // Default template ejs data file
  // EJS options (see https://www.npmjs.com/package/ejs#options)
  ejsOptions: {
    /* your ejs options... */
  }
}
