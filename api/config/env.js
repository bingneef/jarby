jsonfile = require('jsonfile');

file = './config/env.json';
env = jsonfile.readFileSync(file);


module.exports = env
