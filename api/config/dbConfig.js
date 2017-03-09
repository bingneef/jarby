jsonfile = require('jsonfile');

file = __dirname + '/config.json';
dbConfig = jsonfile.readFileSync(file);


module.exports = dbConfig
