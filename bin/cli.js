#!/usr/bin/env node

/**
 * @hperchec/readme-generator [/bin/cli.js]
 * @file CLI entry point to generate readme file
 * @author Hervé Perchec <herve.perchec@gmail.com>
 */

'use strict'

const yargonaut = require('yargonaut') // yargonaut first!
const path = require('path')
const fs = require("fs")
const rootDir = process.cwd()
const readmeGenerator = require('../src/index.js')

console.log((`
--------------------------
@hperchec/readme-generator
--------------------------
`).cyan)

console.log('Made with ' + (('❤').red) + '  by ' + 'Hervé Perchec <herve.perchec@gmail.com>'.yellow + '\n')

yargonaut.style('yellow')
  .helpStyle('cyan.underline')

var argv = require('yargs')
  .scriptName("readme-generator")
  .usage('readme-generator [ init | --config <config_path> ]')
  .command({
    command: 'init',
    describe: 'Initialize a "readme" folder at the root of the project'
  })
  .options({
    'config': {
      alias: 'c',
      describe: 'Specify the configuration file',
      default: './readme/config.js' // Default path to user config
    }
  })
  .help()
  .argv

// Check if 'init'
if (argv._[0] === 'init') {
  const outputDirPath = path.join(rootDir, 'readme')

  // If folder doesn't exist
  if (!fs.existsSync(outputDirPath)) {
    // Some console outputs
    console.log('- Initialize the project')
    console.log('- Create: "' + outputDirPath.yellow + '"')
    try {
      // Create folder
      fs.mkdirSync(outputDirPath)
      // Log success
      console.log('- Status:', '✔ OK'.green)
      console.log('- Created: "' + outputDirPath.cyan + '"')
      console.log('- Copy:')
      console.log('  - ' + '"/node_modules/@hperchec/readme-generator/example/config.example.js"'.yellow + ' to ' + '"/readme/config.js"'.cyan)
      console.log('  - ' + '"/node_modules/@hperchec/readme-generator/example/readme.example.js"'.yellow + ' to ' + '"/readme/readme.js"'.cyan)
      console.log('  - ' + '"/node_modules/@hperchec/readme-generator/example/template.example.md"'.yellow + ' to ' + '"/readme/template.md"'.cyan)
      // Copy files
      // If NODE_ENV = development -> test with local files
      const devPrefix = process.env.NODE_ENV && process.env.NODE_ENV === 'development' 
        ? ''
        : '/node_modules/@hperchec/readme-generator'
      fs.copyFileSync(path.join(rootDir, `${devPrefix}/example/config.example.js`), path.join(rootDir, 'readme', 'config.js'))
      fs.copyFileSync(path.join(rootDir, `${devPrefix}/example/readme.example.js`), path.join(rootDir, 'readme', 'readme.js'))
      fs.copyFileSync(path.join(rootDir, `${devPrefix}/example/template.example.md`), path.join(rootDir, 'readme', 'template.md'))
      // Log success
      console.log('- Status:', '✔ OK'.green)
    } catch (error) {
      // Log fail and throw error
      console.log('- Status:', '✘ FAILED'.red)
      throw error
    }
  } else {
    // Else, throw error
    throw new Error('readme-generator: Init failed. "readme" folder already exists'.red)
  }
} else {
  // Get config path
  const configPath = path.join(rootDir, argv.config)
  // Get configuration object
  const config = require(configPath)

  // Call generator with config
  readmeGenerator(config)
}