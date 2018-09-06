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
