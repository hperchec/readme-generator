const path = require('path')

module.exports = {
  /**
   * Output directory
   * > relative to root folder
   */
  outputDir: 'documentation',
  /**
   * JSDoc options
   */
  jsdoc: {
    /**
     * Configuration path
     */
    configPath: path.resolve(__dirname, './jsdoc/jsdoc.config.js')
  },
  /**
   * jsdoc2md options
   */
  jsdoc2md: {
    /**
     * jsdoc2md partial option
     */
    partial: [
      path.resolve(__dirname, './jsdoc2md/partials/all-docs/docs/body/scope.hbs')
    ]
  }
}
