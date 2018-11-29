var jwt = require('jsonwebtoken');

var config = {
  "userUniqueId": "0xDECAFBAD", // A unique ID for your user
  "userName": "Michael Dolly", // Display name, pick anything you'd like.
  "issuerId": "YOUR-ISSUER-ID-HERE", // Use your Guest Issuer ID from your Guest app
  "issuerSecret":  "YOUR-ISSUER-SECRET" // Use the Guest Issuer Shared Secret from your Guest app
};

config.issuerId = 'Y2lzY29zcGFyazovL3VzL09SR0FOSVpBVElPTi9mMGFmZTM0Ny1jMmJkLTRlMDYtYTY4Zi0zYWQ5MmJiOTU3MzY';
config.issuerSecret = '4S/J7dAs4XuCTte+mv9VpqVp2uAm0BeL3z5Q42uMqsQ=';
config.yourEmail = 'akalsey@cisco.com';

jwt.sign(
  {
    "sub": config.userUniqueId,
    "name": config.userName,
    "iss": config.issuerId
  },
  Buffer.from(config.issuerSecret, 'base64'), // The shared secret from your Guest app
  { expiresIn: '10m' },
  function(err, token) {
    console.log(token);
  }
);