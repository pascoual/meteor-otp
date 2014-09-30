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
 * Call a callback if OTP is ok
 * callAfterOTPCheck(yourFunction, arg1, arg2, ...)
 *
 * /!\ if called client side, be aware that this is easy to bypass.
 *
 * You need to call it client side for best user XP
 * AND server side for security, in server method for example (to do security
 * needs actions)
 */
MeteorOTP.callAfterOTPCheck = function (callback) {
  try {
    if (MeteorOTP.checkOTPExpiration(Meteor.user())) {
      Meteor.call('checkOTP', prompt("Merci de taper un code OTP"), function (err, res) {
        if (res) // only set a result if OTP is ok
          callback(null, res);
        else
          callback(Meteor.Error(401, "OneTimePassCode error: OTP incorrect !"));
      });
      return;
    }
  } catch (err) {
    throw new Meteor.Error(501, "OneTimePassCode error: you don't have OTP activated on your user account");
  }
  // run the callback: OTP is not expired
  callback(null, true);
}
