# Basic demo lab of Webex Guest Issuer

This lab shows how to use Guest Issuer and Webex Teams Widgets to generate a conversation between a persistent guest account and your Teams user.

## Setup

From your Node project, install the lab Node module dependancies jsonwebtoken by typing `npm install`

## Step 1

The code in this step generates a JSON Web Token and writes it to the console. No useful work happens here, but this demonstrates the creation of a JWT token. The next steps will use the token to authenticate a guest account with Webex Teams.

Update `step-1.js` to set a display name, a unique user ID, and your Guest Issuer ID on lines 4-6. The display name would correspond to how the user should appear to people they are talking to in Teams. The unique ID goes in the `sub` field and needs to be unique to this application. Teams guest accounts can be persistent, and you manage the user identity across sessions. The `sub` field is how you tie a Teams guest to your user's identity. Every session with the same `sub` field will correspond to the same user. The Guest Issuer ID is supplied by the Webex for Developers portal when you create your Guest application.

On line 7, change the shared secret to match the Shared Secret shown when you created the Guest application on Webex for Developers.

Run your app (`node step-1.js`) and you'll see the JWT token printed to the screen. It will look something like this:

`eyJhbGciOiJIUIwerAgownnR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTY2MDAyNDk3IiwibmFtZSI6IkIiOiI5MTY2MDAyNDk3IiwiselkyOXpjR0ZIiOiI5MTY2MDAyNDk3IiwiT1NWcEJWRWxQVGk5bU1HRm1aVE0wTnkxak1tSmtMVFJsTURZdFlUWTRaaTB6WVdRNU1tSmlPVFUzTXpZIiwiaWF0IjoxNTM5ODE1MzUzLCJleHAiOjE1Mzk4MTg5NTN9.g3-iseeRaNI8LAyoizGcNI8LAGoIgFkiNI8LA0Eotsc`

## Step 2

This step will exchange that JWT token for a Webex for Developer Oauth token. The Oauth token is valid for authentication with the Webex API like any other Oauth token. The exception is that a Guest oAuth token can only talk to registered Teams users, and cannot talk to other Guests. The oauth token isn't used for anything in this step, just printed to the screen. A later step will use the token to generate a Widget talking to you in Teams.

Edit `step-2.js` to have the same changes as you did in Step 1.

The code from lines 22-29 takes the JWT token and sends it as a POST to the Webex API server, which validates the token and returns an oAuth token. The oAuth token then appears on the screen.

Run the application (`node step-2.js`) and verify that an oAuth token appears on the screen.

## step 3 

Edit `step-3.js` to have the same changes you did in Step 1. Additionally, add the email address you use for your Webex Teams account on line 11.

The code from lines 36-40 writes HTML for a Teams widget. The other changes in this file adds a web server at port 5533 using Express, and sets up a route for the root document on that port. 

Start the application (`node step-3.js`).

Open your browser to [http://localhost:5533](http://localhost:5533) and a Teams widget will appear. The User of this Teams widget is your Guest account, and the widget is direct message conversation between the Guest account and your Teams user account. 

Send a message from the Widget, and then open Teams with your own account to see that the message arrived. Reply to the message and then return to the widget to see the reply appear there.

Terminate the node app (`^C` in the console) and restart it (`node step-3.js`). Reload your browser. Because the guest conversations are persistent, you'll see that the previous conversation remains in the widget.

Now change the `sub` on line 10 to some other value. Terminate and restart the node application. Reload your browser, and now you'll see that the conversation is empty. This is because the `sub` is the identifier for Guest user, and so with a new sub, Teams considers this as a new user.

## Step 4

This step shows using a Guest token with the Webex Javascript SDK to send a message.

Edit `step-4.js` to have the same changes you did in Step 3 (don't forget the email address).

The code from lines 22-24 creates an instance of the Webex SDK object, authenticates using the JWT, and then line 25 checks to ensure that authentication was successful. Lines 27-30 uses the `messages.create` method to send a message to the personEmail for the address you configured on line 9.

Start the application (`node step-4.js`).

Check your Webex Teams account, and you'll see a message of "Howdy!" from the Guest user.

## Further exploration

Create a new Guest Issuer application. Use the new Issuer ID and Shared Secret with the same `sub` and `name`. See that this is a different conversation, as Teams recognizes the combination of `sub` and Issuer ID as unique. Two different Issuer IDs can have the same Sub, without it being the same conversation. This means that the sub only needs to be unique within your application, and not unique globally.

Keeping the same sub and Issuer ID, change the `name` in the Payload. See if this is the same Guest or a different Guest.