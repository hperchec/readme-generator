const path = require('path')
const semver = require('semver')

const rootDir = process.cwd()

// // Get package.json content
// const packageJson = require(path.resolve(rootDir, './package.json'))
// const updateVersion = require('../lib/version/update-version')

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
    })
  },
  /**
   * Handler
   * @param {Object} argv - The argv
   * @return {void}
   */
  handler: async function (argv) {
  //   let targetVersion
  //   const currentVersion = packageJson.version
  //   const packageName = packageJson.name
  //   const preId = argv.preid || (semver.prerelease(currentVersion) && semver.prerelease(currentVersion)[0])
  //   const inc = i => semver.inc(currentVersion, i, preId)
  //   const versionIncrements = [
  //     'patch',
  //     'minor',
  //     'major',
  //     ...(preId ? [ 'prepatch', 'preminor', 'premajor', 'prerelease' ] : [])
  //   ]

  //   /**
  //    * First, check if local repository is clean
  //    */
  //   step('Checking changes to commit')
  //   const { stdout } = await run('git', [ 'diff' ], { stdio: 'pipe', cwd: rootDir })
  //   if (stdout) {
  //     error('Please commit your changes before creating a new release!', new Error('There are changes to commit'))
  //   }
  //   substep(chalk.green('✔ Local repository is clean'), { last: true })
  //   log() // Blank line

  //   /**
  //    * Release prompt
  //    */
  //   step('Setup')
  //   const { release } = await prompts([
  //     {
  //       type: 'select',
  //       name: 'release',
  //       message: 'Release type:',
  //       choices: versionIncrements.map(i => ({ title: `${i} (${inc(i)})`, value: inc(i) })).concat([ { title: 'custom', value: 'custom' } ])
  //     }
  //   ])
  //   // If custom release
  //   if (release === 'custom') {
  //     const { version: customVersion } = await prompts([
  //       {
  //         type: 'text',
  //         name: 'version',
  //         message: 'New custom version:',
  //         initial: currentVersion,
  //         validate: value => Boolean(semver.valid(value))
  //       }
  //     ])
  //     targetVersion = customVersion
  //   } else {
  //     targetVersion = release
  //   }

  //   /**
  //    * Demand confirmation
  //    */
  //   const { yes } = await prompts([
  //     {
  //       type: 'confirm',
  //       name: 'yes',
  //       message: `Releasing v${targetVersion}. Confirm?`,
  //       initial: true
  //     }
  //   ])
  //   if (!yes) {
  //     abort()
  //     return // exit if not confirmed
  //   }
  //   log() // Blank line

  //   /**
  //    * Run tests
  //    */
  //   // step(`Running tests`)
  //   // ... here run tests

  //   /**
  //    * Update version in necessary files
  //    */
  //   await updateVersion(targetVersion)
  //   log() // Blank line

  //   /**
  //    * Generate changelog file
  //    */
  //   step('Generating changelog')
  //   await wait('Generating', async () => {
  //     await run('node', [ './bin/cli', 'changelog' ], { stdio: 'pipe', cwd: rootDir })
  //   })
  //   substep(chalk.green('✔ Success'), { last: true })
  //   log() // Blank line

  //   /**
  //    * Publish package
  //    */
  //   step(`Publishing ${packageName}`)
  //   const releaseTag = targetVersion.includes('alpha')
  //     ? 'alpha'
  //     : targetVersion.includes('beta')
  //       ? 'beta'
  //       : targetVersion.includes('rc')
  //         ? 'rc'
  //         : null
  //   let alreadyPublished = false
  //   await wait('Publishing', async () => {
  //     try {
  //       await run('npm', [ 'publish', ...(releaseTag ? [ '--tag', releaseTag ] : []) ], { stdio: 'pipe', cwd: rootDir })
  //     } catch (e) {
  //       if (e.stderr.match(/previously published/)) {
  //         alreadyPublished = true
  //       } else {
  //         error('Unknown error during publishing', e)
  //       }
  //     }
  //   })
  //   substep(
  //     alreadyPublished
  //       ? chalk.yellow(`Skipping already published: ${packageName}`)
  //       : chalk.green('✔ Success'),
  //     { last: true }
  //   )
  //   log() // Blank line

  //   /**
  //    * Push to git
  //    */
  //   step('Pushing changes')
  //   await wait('Committing', async () => {
  //     try {
  //       await run('git', [ 'add', '.' ], { stdio: 'pipe', cwd: rootDir })
  //       await run('git', [ 'commit', '-m', `release: v${targetVersion}` ], { stdio: 'pipe', cwd: rootDir })
  //     } catch (e) {
  //       error('Unable to commit', e)
  //     }
  //   })
  //   substep(chalk.green('✔ Committed'))
  //   await wait('Creating tag', async () => {
  //     try {
  //       await run('git', [ 'tag', '-a', `v${targetVersion}`, '-m', `v${targetVersion}` ], { stdio: 'pipe', cwd: rootDir })
  //     } catch (e) {
  //       error('Unable to create tag', e)
  //     }
  //   })
  //   substep(chalk.green('✔ Tagged'))
  //   await wait('Pushing', async () => {
  //     try {
  //       await run('git', [ 'push', 'origin', '--follow-tags' ], { stdio: 'pipe', cwd: rootDir })
  //     } catch (e) {
  //       error('Unable to push', e)
  //     }
  //   })
  //   substep(chalk.green('✔ Pushed'), { last: true })
  //   log() // blank line

  //   log(chalk.green(`✔ Release v${targetVersion} successfuly created`))
  //   log()
  }
}

module.exports = process.env.CLI_ENV === 'development' ? command : {}
