const chalk = require('chalk')
const execa = require('execa')

const rootDir = process.cwd()

// Exports command object
const command = {
  /**
   * Command syntax
   */
  command: 'changelog',
  /**
   * Aliases
   */
  aliases: [],
  /**
   * Command description
   */
  describe: 'Generate CHANGELOG file',
  /**
   * Builder
   * @param {Object} yargs
   * @return {Object}
   */
  builder: function (yargs) {
    return yargs.option('i', {
      alias: 'infile',
      type: 'string',
      describe: 'Same as conventional-changelog option',
      default: 'CHANGELOG.md',
      requiresArg: true
    })
  },
  /**
   * Handler
   * @param {Object} argv - The argv
   * @return {void}
   */
  handler: async function (argv) {
    /**
     * Generate changelog file
     */
    console.log('Generating changelog')

    const result = await execa(
      'npx',
      [
        'conventional-changelog',
        '-p', 'angular',
        '-i', argv.infile,
        '-s' // same file to output
      ],
      { stdio: 'pipe', cwd: rootDir }
    )

    if (result instanceof Error) {
      console.error('Unable to generate changelog', result)
    }

    console.log(chalk.green('✔ Success'))
    console.log() // Blank line
  }
}

module.exports = process.env.CLI_ENV === 'development' ? command : {}
