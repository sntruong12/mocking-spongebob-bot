Purpose
---

This is a Twitter bot that will monitor target user. The bot will grab the latest tweet from the target user and will translate the tweet into the mocking SpongeBob meme form.

See this link to learn more about the Mocking SpongeBob meme.
https://knowyourmeme.com/memes/mocking-spongebob

Example of functionality
@targetUser tweets:
sigh what is the meaning of life?

The bot will then tweet out:
targetUser: sigh what is the meaning of life?
me: SiGh wHaT Is tHe mEaNiNg oF LiFe?

*The image of mocking spongebob will be attached to the tweet.

Challenges
---

One of the first obstacles that I faced was how to trigger specific code blocks after another block of code runs first. I used promises to structure the asychronous functions and was able to convert the tweet text to the form of what the bot will tweet along with the attached image.

Another issue that I ran into was how to prevent the bot from tweeting the same tweet over and over again. I decided to go the route of creating a json file that keeps track of 5 tweets. If the json file has more than 5 tweets, the bot uses the Array method Shift() to remove the tweet positioned at index 0. The bot will then check to see if the latest tweet from targetUser is already logged in the json file. If the tweet exists, then the program will stop and wait for the next interval to run again. If the tweet doesn't exist, the bot will log the tweet in the json file then proceed.

Deploying
---
I used Heroku to deploy this app.

Create the following files in the root directory of the bot.js:
config.js
archive.json
Procfile

config.js will contain your API credentials from Twitter.

module.exports = {
  consumer_key:         'x',
  consumer_secret:      'x',
  access_token:         'x',
  access_token_secret:  'x',
};

archive.json should be an object with the property archive that has a value of an array with 5 or less values.
Example:

{"archive":["test1","test2","test3","test4"]}

Procfile is necessary for Heroku in order to change the Dyno formation to worker.
This file will contain only the following text:

worker: node bot.js

Create a new app in heroku.
Be sure to install the heroku cli and git before moving forward.
Run the commands as per heroku's instructions
