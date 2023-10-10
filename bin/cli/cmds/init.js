const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

const { defaultInitTargetRelativePath } = require('../../../src')
const rootDir = process.cwd()

// Exports command object
module.exports = {
  /**
   * Command syntax
   */
  command: 'init',
  /**
   * Aliases
   */
  aliases: [],
  /**
   * Command description
   */
  describe: `Initialize a config folder for the project and injects required files. Default is "${defaultInitTargetRelativePath}"`,
  /**
   * Builder
   * @param {Object} yargs
   * @return {Object}
   */
  builder: function (yargs) {
    return yargs.option('t', {
      alias: 'target',
      type: 'string',
      describe: 'Target directory path',
      default: defaultInitTargetRelativePath,
      requiresArg: true
    })
  },
  /**
   * Handler
   * @param {Object} argv - The argv
   * @return {void}
   */
  handler: function (argv) {
    // Process target option
    const outputDirPath = path.join(rootDir, argv.target)

    // If folder doesn't exist
    if (!fs.existsSync(outputDirPath)) {
      // Some console outputs
      console.log('Initialize the project')
      console.log()

      console.log('- Create: "' + chalk.yellow(outputDirPath) + '"')

      try {
        // Create folder
        fs.mkdirSync(outputDirPath, { recursive: true })
        // Log success
        console.log('- Status:', chalk.green('✔ OK'))
        console.log('- Created: "' + chalk.cyan(outputDirPath) + '"')
        console.log('- Copy:')
        console.log('  - ' + chalk.yellow('"@hperchec/readme-generator/template/config.js"') + ' to ' + chalk.cyan(`"${argv.target}/config.js"`))
        console.log('  - ' + chalk.yellow('"@hperchec/readme-generator/template/data.js"') + ' to ' + chalk.cyan(`"${argv.target}/data.js"`))
        console.log('  - ' + chalk.yellow('"@hperchec/readme-generator/template/template.md"') + ' to ' + chalk.cyan(`"${argv.target}/template.md"`))
        // Copy files
        fs.copyFileSync(path.resolve(__dirname, '../../../template/config.js'), path.resolve(outputDirPath, 'config.js'))
        fs.copyFileSync(path.resolve(__dirname, '../../../template/data.js'), path.resolve(outputDirPath, 'data.js'))
        fs.copyFileSync(path.resolve(__dirname, '../../../template/template.md'), path.resolve(outputDirPath, 'template.md'))
        // Log success
        console.log(chalk.green('- Status:', '✔ OK'))
        console.log()
      } catch (error) {
        // Log fail and throw error
        console.log(chalk.red('- Status:', '✘ FAILED'))
        throw error
      }
    } else {
      // Else, throw error
      throw new Error(chalk.red(`readme-generator: Init failed. "${outputDirPath}" folder already exists`))
    }
  }
}
