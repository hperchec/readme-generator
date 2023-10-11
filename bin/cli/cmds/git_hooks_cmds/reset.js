const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const execa = require('execa')

const rootDir = process.cwd()

// Exports command object
module.exports = {
  /**
   * Command syntax
   */
  command: 'reset',
  /**
   * Aliases
   */
  aliases: [],
  /**
   * Command description
   */
  describe: 'Reset git hooks',
  /**
   * Builder
   * @param {object} yargs - yargs
   * @returns {object} Returns yargs
   */
  builder: function (yargs) {
    return yargs
  },
  /**
   * Handler
   * @param {object} argv - The argv
   * @returns {void}
   */
  handler: async function (argv) {
    /**
     * Reset git hooks
     */
    console.log('Reset git hooks')

    // Create temporary empty configuration file
    const tempConfigFilePath = './__TEMP_SIMPLE_GIT_HOOKS_CONFIG__.json' // relative to project root folder
    fs.writeFileSync(path.resolve(rootDir, tempConfigFilePath), '{}')

    // Run command with empty configuration
    let commandError = false

    const sghResult = await execa('npx',
      [
        'simple-git-hooks',
        tempConfigFilePath
      ],
      { stdio: 'pipe', cwd: rootDir }
    )

    // If error
    if (sghResult.stderr) {
      commandError = sghResult.stderr
    }

    // Don't forget to always remove temporary file
    fs.unlinkSync(path.resolve(rootDir, tempConfigFilePath))

    // If error
    if (commandError) {
      console.log(chalk.red('❌ Unable to reset git hooks.'))
      process.exit(1) // Abort with error
    } else {
      // Everything is okay
      console.log(chalk.green('✔ Git hooks successfuly reset'))
      console.log() // blank line
    }
  }
}
