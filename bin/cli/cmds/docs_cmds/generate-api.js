const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

const rootDir = process.cwd()

const generateAPIDoc = require('../../lib/docs/generate-api-doc')

const defaultConfigRelativePath = './.docs/docs.config.js' // relative to root folder

// Exports command object
module.exports = {
  /**
   * Command syntax
   */
  command: 'generate:api',
  /**
   * Aliases
   */
  aliases: [],
  /**
   * Command description
   */
  describe: 'Generate API docs from source code',
  /**
   * Builder
   * @param {Object} yargs
   * @return {Object}
   */
  builder: function (yargs) {
    yargs.option('c', {
      alias: 'config',
      type: 'string',
      describe: `Path to custom config file relative to root folder (default: "${defaultConfigRelativePath}")`,
      requiresArg: true
    })
    return yargs
  },
  /**
   * Handler
   * @param {Object} argv - The argv
   * @return {void}
   */
  handler: async function (argv) {
    let options = {}
    let configPath = path.resolve(rootDir, defaultConfigRelativePath) // default relative to root folder

    /**
     * Process config option
     */
    console.log('Configuration')
    if (argv.config) {
      configPath = path.resolve(rootDir, argv.config)
      // If file does not exist
      if (!fs.existsSync(configPath)) {
        // Log error and exit
        console.error(`Can't find custom config file: "${configPath}"`)
        process.exit(1)
      }
      options = require(configPath)
    } else {
      // Else -> no custom config. Check if default 'docs.config.js' exists
      if (fs.existsSync(configPath)) {
        options = require(configPath)
      } else {
        // Just log info
        console.log(chalk.yellow(`No config file "${defaultConfigRelativePath}" found. Applying default config...\n`))
      }
    }
    console.log(chalk.green('✔ Successfuly configured'))
    console.log() // blank line

    /**
     * If everything is okay generate doc
     */
    await generateAPIDoc(options)
  }
}
