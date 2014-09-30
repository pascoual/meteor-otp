Package.describe({
  name: "pascoual:otp",
  summary: "Time-based One-time Password Algorithm",
  version: "0.1.0",
  git: "https://github.com/pascoual/meteor-otp.git"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.2.2');
  api.addFiles('one-time-passcode-common.js');
  api.addFiles('one-time-passcode-client.js', 'client');
  api.addFiles('one-time-passcode-server.js', 'server');
  api.use('jeeeyul:moment-with-langs@2.8.2')
  api.export('MeteorOTP');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('pascoual:one-time-passcode');
  api.addFiles('pascoual:one-time-passcode-tests.js');
});

Npm.depends({
  "speakeasy": "https://github.com/markbao/speakeasy/tarball/d9525fdde341624109557da52ad6cdd270025059",
  "qrcode": "0.2.10"});
