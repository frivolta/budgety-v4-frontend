/// <reference types="cypress" />
const dotenvPlugin = require('cypress-dotenv');

/* module.exports = on => {
  on('file:preprocessor', cypressTypeScriptPreprocessor)
} */
/**
 * @type {Cypress.PluginConfig}
 */
const wp = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
  config = dotenvPlugin(config)
  const options = {
    webpackOptions: {
      resolve: {
        extensions: [".ts", ".tsx", ".js"]
      },
      module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            options: { transpileOnly: true }
          }
        ]
      }
    },
  }
  on('file:preprocessor', wp(options))
}

