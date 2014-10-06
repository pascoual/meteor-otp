if (typeof MeteorOTP === "undefined")
  MeteorOTP = {};

MeteorOTP.checkOTPExpiration = function (user) {
  var delay = 20; // minutes
  try {
    delay = Meteor.settings.public.OTP.expiration;
  } catch (e) {
    console.log("No Application config for OTP expiration delay, using default: 20 minutes");
  }
  return moment(user.onePassCode.lastCheckDate).add(delay, 'm').isBefore(moment());
}
