const path = require('path')
const chalk = require('chalk')
const execa = require('execa')

const rootDir = path.resolve(__dirname, '../')

/**
 * commit-msg git hook
 */
;(async function () {
  console.log('Git hook: commit-msg')

  // Get git commit msg path from args
  const args = process.argv.slice(2)
  const gitMsgPath = args[0]

  // original is: npx --no -- commitlint --edit ${1}
  // we replace "${1}" by gitMsgPath arg
  const commitLintResult = await execa('npx',
    [
      '--no',
      '--',
      'commitlint',
      '--edit',
      gitMsgPath
    ],
    { cwd: rootDir }
  )

  // If error
  if (commitLintResult.stderr) {
    console.log(chalk.red('❌ Git hook: "commit-msg" failed. Please check ./COMMIT_CONVENTION.md for more informations.'))
    process.exit(1) // Abort with error
  }

  // Everything is okay
  console.log(chalk.green('✔ Git hook: "commit-msg" passed'))

  console.log() // blank line
})()
