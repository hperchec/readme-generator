const chalk = require('chalk')

// Exports command object
const command = {
  /**
   * Command syntax
   */
  command: 'git-hooks <command>',
  /**
   * Aliases
   */
  aliases: [],
  /**
   * Command description
   */
  describe: 'Git relative commands',
  /**
   * Builder
   * @param {Object} yargs
   * @return {Object}
   */
  builder: function (yargs) {
    return yargs.commandDir('git_hooks_cmds')
      .demandCommand(1, chalk.red('Command is missing. See help to learn more.'))
  },
  /**
   * Handler
   * @param {Object} argv - The argv
   * @return {void}
   */
  handler: async function (argv) {
    // ...
  }
}

module.exports = process.env.CLI_ENV === 'development' ? command : {}
