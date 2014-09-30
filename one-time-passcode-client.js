/**
 * To be used :
 * - https://github.com/markbao/speakeasy
 * - otpauth://totp/Example:alice@google.com?secret=JBSWY3DPEHPK3PXP&issuer=Example 
 * - install npm module:
 *   > sudo npm install qrcode -g
 *   > npm install speakeasy 
 * - Create with:
 *   > var qrcode = require('qrcode');
 *   > var speakeasy = require('speakeasy');
 *   >
 *   > var key = speakeasy.generate_key( {length : 20} );
 *   > var otpURL = "otpauth://totp/marvin.morea.fr:prichier@morea.fr?secret=" + key.base32 + "&issuer=marvin.morea.fr"
 *   > qrcode.toDataURL( otpURL, function(qrcode ) {
 *       console.log( qrcode );
 *     });
 * // http://stackoverflow.com/questions/21944544/what-data-do-i-have-to-use-to-generate-a-qr-code-for-google-authenticator
 * - Check with :
 *   > speakeasy.totp({key: key.base32, encoding: 'base32'});
 */

// subscrib
Meteor.subscribe("userOTP");

if (typeof MeteorOTP === "undefined")
  MeteorOTP = {};

/**
 * Run a function if OTP is ok
 * runAfterOTPCheck(yourFunction, arg1, arg2, ...)
 */
MeteorOTP.runAfterOTPCheck = function (toRun) {
  var self = this;
  var toRunArgs = Array.prototype.slice.call(arguments);
  toRunArgs.shift();
  try {
    if (MeteorOTP.checkOTPExpiration(Meteor.user())) {
      Meteor.call('checkOTP', prompt("Merci de taper un code OTP"), function (err, res) {
        if (res)
          // run the function fresh OTP is ok
          toRun.apply(self, toRunArgs);
        else
          throw "OneTimePassCode error: OTP incorrect !"
      });
    }
  } catch (err) {
    throw "OneTimePassCode error: you don't have OTP activated on your user account";
  }
  // run the function: OTP is not expired
  toRun.apply(self, toRunArgs);
}
