/**
 * @hperchec/readme-generator Template EJS data example file
 */

'use strict'

// Dependencies
const markdownTable = require('markdown-table')

// Based on the package.json file, get some data and informations
const packageJson = require('../package.json')
// Get dependencies
const dependencies = packageJson.dependencies
// Get dev dependencies
const devDependencies = packageJson.devDependencies
// Homepage
const homepage = packageJson.homepage
// Repository URL
const repositoryUrl = packageJson.repository.url

// Output a markdown formatted table from a js object
// Like:
// |name|version|
// |----|-------|
// |    |       |
function mdDependencies (deps) {
  return markdownTable([
    ['name', 'version'],
    ...(Object.entries(deps))
  ])
}

/**
 * Export data for readme file templating
 */
module.exports = {
  projectUrl: homepage,
  repositoryUrl: repositoryUrl,
  dependencies: mdDependencies(dependencies),
  devDependencies: mdDependencies(devDependencies)
  /* ... */
}