var CiscoWebex = require(`ciscospark`);
var jwt = require('jsonwebtoken');

var config = {
  "userUniqueId": "0xDECAFBAD", // A unique ID for your user
  "userName": "Michael Dolly", // Display name, pick anything you'd like.
  "issuerId": "YOUR-ISSUER-ID-HERE", // Use your Guest Issuer ID from your Guest app
  "issuerSecret":  "YOUR-ISSUER-SECRET", // Use the Guest Issuer Shared Secret from your Guest app
  "yourEmail":  "you@example.com" // The email address you use with Webex Teams
};

jwt.sign(
  {
    "sub": config.userUniqueId,
    "name": config.userName,
    "iss": config.issuerId
  },
  Buffer.from(config.issuerSecret, 'base64'), 
  { expiresIn: '10m' },
  function(err, token) {
    console.log({token});
    const webex = new CiscoWebex();
    // Use the JWT to authenticate the webex object
    webex.authorization.requestAccessTokenFromJwt({"jwt":token}).then(() => {
        if (webex.canAuthorize) {
            // Authorization is successful, send a message
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
