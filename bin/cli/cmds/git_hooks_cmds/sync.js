const chalk = require('chalk')
const execa = require('execa')

const rootDir = process.cwd()

// Exports command object
module.exports = {
  /**
   * Command syntax
   */
  command: 'sync',
  /**
   * Aliases
   */
  aliases: [],
  /**
   * Command description
   */
  describe: 'Sync git hooks',
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
     * Sync git hooks
     */
    console.log('Sync git hooks')

    const sghResult = await execa('npx',
      [ 'simple-git-hooks' ],
      { cwd: rootDir }
    )

    // If error
    if (sghResult.stderr) {
      console.error(chalk.red('❌ Unable to sync git hooks.'))
      process.exit(1) // Abort with error
    } else {
      // Everything is okay
      console.log(chalk.green('✔ Git hooks successfuly sync'))
      console.log() // blank line
    }
  }
}
