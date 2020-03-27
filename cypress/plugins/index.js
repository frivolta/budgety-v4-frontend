/// <reference types="cypress" />
const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor')

/* module.exports = on => {
  on('file:preprocessor', cypressTypeScriptPreprocessor)
} */
/**
 * @type {Cypress.PluginConfig}
 */
const wp = require('@cypress/webpack-preprocessor')

module.exports = (on) => {
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

