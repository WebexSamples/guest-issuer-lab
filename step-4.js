var CiscoWebex = require(`ciscospark`);
var jwt = require('jsonwebtoken');

var config = {
  "userUniqueId": "0xDECAFBAD", // A unique ID for your user
  "userName": "Michael Dolly", // Display name, pick anything you'd like.
  "issuerId": "YOUR-ISSUER-ID-HERE", // Use your Guest Issuer ID from your Guest app
  "issuerSecret":  "YOUR-ISSUER-SECRET" // Use the Guest Issuer Shared Secret from your Guest app
};

jwt.sign(
  {
    "sub": config.userUniqueId,
    "name": config.userName,
    "iss": config.issuerId
  },
  Buffer.from(config.issuerSecret, 'base64'), // The shared secret from your Guest app
  { expiresIn: '10m' },
  function(err, token) {
    console.log({token});
    const webex = new CiscoWebex();
    webex.authorization.requestAccessTokenFromJwt({"jwt":token}).then(() => {
        if (webex.canAuthorize) {
            // Authorization is successful
            return webex.messages.create({
                text: 'Howdy!',
                toPersonEmail: config.yourEmail
            });
        }
    })
    .catch(e => {
        console.log('ERROR', e);
    });
  }
);
