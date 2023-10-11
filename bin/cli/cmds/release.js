const path = require('path')
const chalk = require('chalk')
const semver = require('semver')
const prompts = require('prompts')
const execa = require('execa')

const rootDir = process.cwd()

// Get package.json content
const packageJson = require(path.resolve(rootDir, './package.json'))

// Exports command object
const command = {
  /**
   * Command syntax
   */
  command: 'release',
  /**
   * Aliases
   */
  aliases: [],
  /**
   * Command description
   */
  describe: 'Make a release',
  /**
   * Builder
   * @param {Object} yargs
   * @return {Object}
   */
  builder: function (yargs) {
    return yargs.option('p', {
      alias: 'preid',
      type: 'string',
      describe: 'Pre-release id',
      requiresArg: true
    }).option('dry', {
      type: 'boolean',
      describe: 'Run in dry mode',
      default: false
    })
  },
  /**
   * Handler
   * @param {Object} argv - The argv
   * @return {void}
   */
  handler: async function (argv) {
    let targetVersion
    const currentVersion = packageJson.version
    const packageName = packageJson.name
    const preId = argv.preid || (semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0])
    const inc = i => semver.inc(currentVersion, i, preId)
    const versionIncrements = [
      'patch',
      'minor',
      'major',
      ...(preId ? [ 'prepatch', 'preminor', 'premajor', 'prerelease' ] : [])
    ]

    /**
     * First, check current branch (skip in dry mode)
     */
    if (!argv.dry) {
      console.log('Checking branch')
      const checkBranchResult = await execa('git',
        [ 'branch', '--show-current' ],
        { stdio: 'pipe', cwd: rootDir }
      )
      const currentBranch = checkBranchResult.stdout
      if (currentBranch !== 'main') {
        console.error('Releases are only allowed in "main" branch.', new Error('Not valid branch: ' + currentBranch))
        process.exit(1)
      }
      console.log(chalk.green('✔ Valid branch'))
      console.log() // Blank line
    }

    /**
     * Then, check if local repository is clean
     */
    console.log('Checking changes to commit')
    const { stdout } = await execa('git',
      [ 'diff' ],
      { stdio: 'pipe', cwd: rootDir }
    )
    if (stdout) {
      console.error('Please commit your changes before creating a new release!', new Error('There are changes to commit'))
      process.exit(1)
    }
    console.log(chalk.green('✔ Local repository is clean'))
    console.log() // Blank line

    /**
     * Release prompt
     */
    console.log('Setup')
    const { release } = await prompts([
      {
        type: 'select',
        name: 'release',
        message: 'Release type:',
        choices: versionIncrements.map(i => ({ title: `${i} (${inc(i)})`, value: inc(i) })).concat([ { title: 'custom', value: 'custom' } ])
      }
    ])
    // If custom release
    if (release === 'custom') {
      const { version: customVersion } = await prompts([
        {
          type: 'text',
          name: 'version',
          message: 'New custom version:',
          initial: currentVersion,
          validate: value => Boolean(semver.valid(value))
        }
      ])
      targetVersion = customVersion
    } else {
      targetVersion = release
    }

    /**
     * Demand confirmation
     */
    const { yes } = await prompts([
      {
        type: 'confirm',
        name: 'yes',
        message: `Releasing v${targetVersion}. Confirm?`,
        initial: true
      }
    ])
    if (!yes) {
      process.exit()
      return // exit if not confirmed
    }
    console.log() // Blank line

    /**
     * Update version in necessary files
     */
    console.log('Bump version')
    await execa('npm',
      [
        ...(argv.dry ? [ '--no-git-tag-version' ] : []),
        'version',
        targetVersion
      ],
      { stdio: 'pipe', cwd: rootDir }
    )
    console.log() // Blank line

    /**
     * Publish package (skip in dry mode)
     */
    console.log(`Publishing ${packageName}`)
    const releaseTag = targetVersion.includes('alpha')
      ? 'alpha'
      : targetVersion.includes('beta')
        ? 'beta'
        : targetVersion.includes('rc')
          ? 'rc'
          : null

    let alreadyPublished = false

    const publishResult = await execa('npm',
      [
        'publish',
        ...(argv.dry ? [ '--dry-run' ] : []),
        ...(releaseTag ? [ '--tag', releaseTag ] : [])
      ],
      { stdio: 'pipe', cwd: rootDir }
    )

    // If error
    if (publishResult.stderr) {
      if (publishResult.stderr.match(/previously published/)) {
        alreadyPublished = true
      } else {
        console.error('Unknown error during publishing', publishResult.stderr)
        process.exit(1)
      }
    }

    console.log(
      alreadyPublished
        ? chalk.yellow(`Skipping already published: ${packageName}`)
        : chalk.green('✔ Success')
    )
    console.log() // Blank line

    console.log(chalk.green(`✔ Release v${targetVersion} successfuly created`))
    console.log()
  }
}

module.exports = process.env.CLI_ENV === 'development' ? command : {}
