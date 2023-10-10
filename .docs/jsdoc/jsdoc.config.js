const { packageJson } = require('../../src').utils

/**
 * See https://jsdoc.app/about-configuring-jsdoc.html
 * and plugin: https://gitlab.com/hperchec/jsdoc-plugin-define
 */
module.exports = {
  plugins: [
    'node_modules/@hperchec/jsdoc-plugin-define'
  ],
  pluginOptions: {
    define: {
      globals: {
        VERSION: packageJson.version
      }
    }
  }
}
