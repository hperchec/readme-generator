module.exports = {
  extends: [
    'standard',
    'plugin:jsdoc/recommended'
  ],
  processor: 'disable/disable', // For "disable" plugin
  plugins: [
    'disable', // plugin to disable other plugins (https://www.npmjs.com/package/eslint-plugin-disable)
    'jsdoc' // parse docblocks (JSDoc)
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'array-bracket-spacing': [ 'error', 'always' ],
    // eslint-plugin-jsdoc
    'jsdoc/check-tag-names': [ 'error', {
      definedTags: [
        'category', // jsdoc2md/dmd featured tag
        'typicalname' // jsdoc2md/dmd featured tag
      ]
    } ]
  },
  settings: {
    /**
     * Global settings for eslint-plugin-jsdoc
     */
    jsdoc: {
      tagNamePreference: {
        return: 'returns',
        augments: 'extends'
      }
    }
  },
  overrides: [
    /**
     * eslint-plugin-disable:
     * Use "jsdoc" plugin only for source files, disable for other
     */
    {
      files: [
        '!src/**/*.js'
      ],
      settings: {
        'disable/plugins': [ 'jsdoc' ]
      }
    },
    /**
     * Tests environment
     */
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
