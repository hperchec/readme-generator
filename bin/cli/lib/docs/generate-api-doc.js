const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const merge = require('lodash.merge')
const jsdoc2md = require('jsdoc-to-markdown')

const rootDir = path.resolve(__dirname, '../../../../')

// Default config
const defaultConfig = {
  outputDir: 'documentation',
  jsdoc: {
    configPath: undefined
  },
  jsdoc2md: {
    partial: []
  }
}

/**
 * Generate doc function
 * @param {object} [options = {}] - The options object
 * @returns {void}
 */
module.exports = async function generateAPIDoc (options = {}) {
  // Process options
  options = merge(defaultConfig, options)

  const docs = {
    API: {
      sourcePath: path.resolve(rootDir, 'src/index.js'),
      destPath: path.resolve(rootDir, 'documentation/api.md')
    }
  }

  /**
   * Generate doc
   */
  console.log('Generate doc')

  // Loop on docs
  for (const name in docs) {
    const sourcePath = docs[name].sourcePath
    const destPath = docs[name].destPath

    let genResult = await jsdoc2md.render({
      'no-cache': Boolean(options.jsdoc.configPath),
      files: sourcePath,
      template: `# ${name} documentation\n\n{{>main}}`,
      partial: options.jsdoc2md.partial,
      configure: options.jsdoc.configPath
    })
    // f*cking windows compat:
    // jsdoc2md will generate CR (\r) character for @example blocks content line endings
    genResult = genResult.replace(/\r(\n)?/g, '\n')

    // Write output
    console.log(`Writing file "${path.basename(destPath)}"`)
    await fs.writeFile(destPath, genResult, { encoding: 'utf8' })

    console.log(chalk.green(`File "${path.basename(destPath)}" successfuly generated`))
  }

  console.log(chalk.green('✔ Success'))
  console.log() // Blank line
}
