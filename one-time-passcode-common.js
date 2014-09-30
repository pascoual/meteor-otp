if (typeof MeteorOTP === "undefined")
  MeteorOTP = {};

MeteorOTP.checkOTPExpiration = function (user) {
  return moment(user.onePassCode.lastCheckDate).add(20, 'm').isBefore(moment());
}
