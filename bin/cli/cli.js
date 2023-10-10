/**
 * @hperchec/readme-generator [/bin/cli.js]
 * @file CLI module
 * @author Hervé Perchec <herve.perchec@gmail.com>
 */

const yargonaut = require('yargonaut') // yargonaut first!
const path = require('path')
const chalk = require('chalk')
const yargs = require('yargs')

const { generate: readmeGenerator, defaultInitTargetRelativePath } = require('../../src')
const rootDir = process.cwd()

yargonaut.style('yellow')
  .helpStyle('cyan.underline')

function getBanner () {
  let str = ''
  const title = '@hperchec/readme-generator'
  const length = title.length - 9 // removes characters generated by chalk.bold from length
  str += chalk.cyan('-'.repeat(length) + '\n')
  str += chalk.cyan(title + '\n')
  str += chalk.cyan('-'.repeat(length) + '\n')
  str += chalk.italic('Made with') + ' ' + chalk.red('❤') + '  ' + chalk.italic('by ') + chalk.bold('Hervé Perchec <contact@herve-perchec.com>') + '\n'
  return str
}

// CLI
const cli = yargs
  .scriptName('readme-generator')
  .usage(`${getBanner()}\nUsage: $0 [ <options> | init [ <options> ] ]`)
  .help()
  .commandDir('cmds')
  .options({
    'config': {
      alias: 'c',
      describe: 'Specify the configuration file',
      default: `${defaultInitTargetRelativePath}/config.js` // Default path to user config
    }
  })
  // Default command
  .command({
    command: '$0', 
    describe: 'Generate README file',
    handler: async (argv) => {
      // Get config path
      const configPath = path.join(rootDir, argv.config)
      // Get configuration object
      const config = require(configPath)
      // Call generator with config
      await readmeGenerator(config)
    }
  })


module.exports = cli
