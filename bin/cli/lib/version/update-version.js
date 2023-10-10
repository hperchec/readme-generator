const fs = require('fs')
const path = require('path')
const juisy = require('../../../../src')

const {
  $style,
  error,
  step,
  substep,
  run,
  wait
} = juisy.utils

const rootDir = path.resolve(__dirname, '../../../../')

// File paths
const filePaths = {
  packageJson: path.resolve(rootDir, './package.json')
}
// Get package.json content
const packageJson = require(filePaths.packageJson)

/**
 * Update version in necessary files
 * @param {string} version - The version
 * @return {void}
 */
module.exports = async function updateVersion (version) {
  // Update version for each file
  packageJson.version = version

  /**
   * Update files
   */
  step('Updating version in necessary files')
  // Update package.json
  try {
    fs.writeFileSync(filePaths.packageJson, JSON.stringify(packageJson, null, 4), 'utf8')
  } catch (e) {
    error('Unable to update package.json file', e)
  }
  substep($style.green('✔ package.json successfuly updated'))
  // Updating package-lock
  await wait('Updating package-lock.json', async () => {
    try {
      await run('npm', [ 'install', '--prefer-offline' ], { stdio: 'pipe', cwd: rootDir })
    } catch (e) {
      error('Unable to update package-lock.json file', e)
    }
  })
  substep($style.green('✔ package-lock.json successfuly updated'), { last: true })
}
