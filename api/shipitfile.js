module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-pm2')(shipit);
  require('shipit-npm')(shipit);
  require('shipit-shared')(shipit);

  shipit.initConfig({
    default: {
      workspace: 'tmp',
      deployTo: '/var/www/recipe-book-api',
      repositoryUrl: 'git@github.com:bingneef/jarby.git',
      ignores: ['.git', 'node_modules'],
      keepReleases: 10,
      shallowClone: true,
      dirToCopy: 'api',
      npm: {
        remote: true,
        installFlags: ['--only=production']
      },
      shared: {
        overwrite: false,
        files: [
          'config/config.json',
          'config/env.json',
          'app.json'
        ],
      }
    },
    staging: {
      branch: 'develop',
      servers: 'bing@5.157.85.46'
    },
    production: {
      branch: 'master',
      servers: 'bing@5.157.85.46'
    }
  });

  shipit.blTask('db:migrate', function() {
    return shipit.remote('cd /var/www/recipe-book-api/current && sequelize db:migrate');
  });

  shipit.on('published', function() {
    return shipit.start('db:migrate');
  });
};


