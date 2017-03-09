jsonfile = require('jsonfile');

file = __dirname + '/env.json';
env = jsonfile.readFileSync(file);


module.exports = env
