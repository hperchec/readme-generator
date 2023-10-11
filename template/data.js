/**
 * @hperchec/readme-generator Template EJS data example file
 */

// Import package.json data
const pkg = require('../../package.json')
// Repository URL
const repositoryUrl = pkg.repository.url
const projectUrl = pkg.repository.url.match(/^[git+]?(.*)\.git$/)[1] // find string between 'git+' and '.git'
// Get dependencies
const dependencies = pkg.dependencies || {}
// Get dev dependencies
const devDependencies = pkg.devDependencies || {}

/**
 * Export data for readme file templating
 */
module.exports = {
  pkg,
  repositoryUrl,
  projectUrl,
  dependencies,
  devDependencies
  /* ... */
}
