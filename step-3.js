var jwt = require('jsonwebtoken');
var request = require('request');
var express = require('express');
const opn = require('opn');

var config = {
  "userUniqueId": "0xDECAFBAD", // A unique ID for your user
  "userName": "Michael Dolly", // Display name, pick anything you'd like.
  "issuerId": "YOUR-ISSUER-ID-HERE", // Use your Guest Issuer ID from your Guest app
  "issuerSecret":  "YOUR-ISSUER-SECRET", // Use the Guest Issuer Shared Secret from your Guest app
  "yourEmail":  "you@example.com" // The email address you use with Webex Teams
};
config.issuerId = 'Y2lzY29zcGFyazovL3VzL09SR0FOSVpBVElPTi9mMGFmZTM0Ny1jMmJkLTRlMDYtYTY4Zi0zYWQ5MmJiOTU3MzY';
config.issuerSecret = '4S/J7dAs4XuCTte+mv9VpqVp2uAm0BeL3z5Q42uMqsQ=';
config.yourEmail = 'akalsey@cisco.com';


var app = express();
var port = '5533';

app.get('/', function(req, res) {
    jwt.sign(
        {
          "sub": config.userUniqueId,
          "name": config.userName,
          "iss": config.issuerId
        },
        Buffer.from(config.issuerSecret, 'base64'), // The shared secret from your Guest app
        { expiresIn: '10m' },
        function(err, token) {
          console.log('JWT', token);
          console.log('Getting Oauth token...');
          request.post({
              url : 'https://api.ciscospark.com/v1/jwt/login',
              auth: {'bearer': token}
            },
            function (error, response, body) {
              var bearer = JSON.parse(body).token;
              console.log('OAuth token', bearer);
              res.send(`<link  rel="stylesheet" href="https://code.s4d.io/widget-space/production/main.css">
              <script src="https://code.s4d.io/widget-space/production/bundle.js"></script>
              <div data-toggle="ciscospark-space"
                      data-access-token="${bearer}"
                      data-to-person-email="${config.yourEmail}" />`);
            }
          );  
        }
    );
});

var server = app.listen(port, function() {
    console.log('listening at http://localhost:' + port);
    opn('http://localhost:' + port);

  });