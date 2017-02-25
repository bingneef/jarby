jsonfile = require('jsonfile');

file = 'config/config.json';
dbConfig = jsonfile.readFileSync(file);


module.exports = dbConfig
