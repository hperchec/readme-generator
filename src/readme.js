/**
 * @hperchec/readme-generator [/src/readme.js]
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
// Get package name
const packageName = packageJson.name
// Get dependencies
const dependencies = packageJson.dependencies
// Get dev dependencies
const devDependencies = packageJson.devDependencies
// Get authors (author + contributors)
const authors = [packageJson.author, ...packageJson.contributors]
// Homepage
const homepage = packageJson.homepage
// Repository
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
 * Return markdown list of persons
 * @param {Array} authors
 * @return {String}
 */
function getMdAuthors (authors) {
  var mdString = ''
  authors.forEach((person) => {
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
  authors: getMdAuthors(authors),
  generateAsciiTree: function (str) {
    return asciitree.generate(str) // See documentation https://www.npmjs.com/package/ascii-tree
  }
}
