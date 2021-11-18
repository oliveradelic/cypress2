//const axios = require('axios').default;
const fs = require('fs-extra');
const path = require('path');

function getConfigurationFileByEnvName(env) {
  const fileLocation = path.resolve('cypress/config', `config.${env}.json`);
  return fs.readJson(fileLocation);
}
module.exports = (on, config) => {
  const envFile = config.env.configFile || 'staging';
  return getConfigurationFileByEnvName(envFile);
};
