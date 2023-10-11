const path = require('path')
const chalk = require('chalk')
const execa = require('execa')

const rootDir = path.resolve(__dirname, '../')

/**
 * Pre commit git hook
 */
;(async function () {
  console.log('Git hook: pre-commit')

  // npx lint-staged
  const lintStagedResult = await execa('npx',
    [ 'lint-staged' ],
    { stdio: 'pipe', cwd: rootDir }
  )

  // If error
  if (lintStagedResult.stderr) {
    console.error('Git hook: "commit-msg" error: ', lintStagedResult.stderr)
    process.exit(1)
  }

  // Everything is okay
  console.log(chalk.green('✔ Git hook: "pre-commit" passed'))

  console.log() // blank line
})()
