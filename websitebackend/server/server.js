'use strict';

const { Role } = require('loopback');
const loopback = require('loopback');
const boot = require('loopback-boot');

const app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

app.models.user.find((err, result) => {
  if (result.length === 0) {
    const user = {
      email: 'doiychevk@gmail.com',
      password: 'test',
      username: 'KalinD',
    };
    app.models.user.create(user, (err, res) => {
      console.log("Tried to create user", err, res);
      app.models.Profile.create({
        first_name: res.username,
        created_at: new Date(),
        userId: res.id
      }, (err, result) => {
        if (!err && result) {
          console.log('Created a new profile: ', result);
        } else {
          console.error(err);
        }
      });
    });
  }
});

app.models.user.afterRemote('create', (context, user, next) => {
  console.log('New user is: ', user);
  app.models.Profile.create({
    first_name: user.username,
    created_at: new Date(),
    userId: user.id
  }, (err, result) => {
    if (!err && result) {
      console.log('Created a new profile: ', result);
    } else {
      console.error(err);
    }
  });
  next();
});

app.models.Role.find({ where: { name: 'admin' } }, (error, role) => {
  if (!error && role) {
    if (role.length === 0) {
      app.models.Role.create({
        name: 'admin',
      }, (err, res) => {
        if (!err && res) {
          app.models.user.findOne((usererror, user) => {
            if (!usererror && user) {
              res.principals.create({
                principleType: app.models.RoleMapping.USER,
                principleId: user.id,
              }, (e, principle) => {
                console.log("Created principal", e, principle);
              });
            }
          });          
        }
      });
    }
  }
});