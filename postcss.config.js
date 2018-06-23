const path = require('path');

module.exports = {
  plugins: [
    require('stylelint')({
      configFile: path.join(__dirname, 'stylelint.config.js')
    }),
  ]
}