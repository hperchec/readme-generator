/**
 * @hperchec/readme-generator [/src/data.js]
 * @file Data for default readme template render
 * This data will be injected in ./template.md
 * @author Hervé Perchec <herve.perchec@gmail.com>
 */

'use strict'

// Dependencies
const markdownTable = require('markdown-table')
var asciitree = require('ascii-tree')

// Import package.json data
const packageJson = require('../package.json')
// Based on the package.json file, get some data and informations
const packageName = packageJson.name
const dependencies = packageJson.dependencies || {}
const devDependencies = packageJson.devDependencies || {}
const peerDependencies = packageJson.peerDependencies || {}
const author = packageJson.author
const contributors = packageJson.contributors || []
const license = packageJson.license || 'Unknown'
const homepage = packageJson.homepage
const repository = packageJson.repository

// Repo URL
const repositoryUrl = repository.url

/**
 * Return markdown table rows for dependencies
 * @param {Array} deps
 * @return {String}
 */
function getMdDependencies (deps) {
  return markdownTable([
    ['name', 'version'],
    ...(Object.entries(deps))
  ])
}

/**
 * Return author link
 * @param {Object} author
 * @return {string}
 */
function getMdAuthor (author) {
  return '[' + author.name + '](' + author.url + ')'
}

/**
 * Return markdown list of persons
 * @param {Array} contributors
 * @return {String}
 */
function getMdContributors (contributors) {
  var mdString = ''
  contributors.forEach((person) => {
    mdString += '- [' + person.name + '](' + person.url + ')\n'
  })
  return mdString
}

/**
 * Export data for readme file templating
 */
module.exports = {
  packageName: packageName,
  projectUrl: homepage,
  repositoryUrl: repositoryUrl,
  dependencies: getMdDependencies(dependencies),
  devDependencies: getMdDependencies(devDependencies),
  peerDependencies: getMdDependencies(peerDependencies),
  author: getMdAuthor(author),
  contributors: getMdContributors(contributors),
  license: license,
  generateAsciiTree: function (str) {
    return asciitree.generate(str) // See documentation https://www.npmjs.com/package/ascii-tree
  }
}
