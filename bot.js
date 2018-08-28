const Twit = require('twit');
const config = require('./config.js')

//Set up keys for using Twit module

const T = new Twit(config);

//
// Check user most recent tweets and convert tweet
//

let getTweetsParams = {
  screen_name: 'tanner_johnson',
  count: 1,
  exclude_replies: true,
  include_rts: false
};

let originalTweet = []
let convertedTweetArray = [];
let convertedTweet;

T.get('statuses/user_timeline', getTweetsParams)
  .catch(function (err) {
    console.log('error');
  })

  //format tweet in all lowercase

  .then(function(result) {
    let tweet = result.data[0].text;
    originalTweet = tweet;
    // console.log(originalTweet[0]);
    let lowerCaseTweet = tweet.toLowerCase();
    // console.log(`Line 29 lowercase version of tweet: ${lowerCaseTweet}`);
    return lowerCaseTweet;
  })

  //convert tweet in mocking form pushed to an array

  .then(function(result) {
    // console.log(`Line 33 result: ${result}`);
    for (let i = 0; i < result.length; i++) {
      if (i === 0 || i % 2 === 0) {
        convertedTweetArray.push(result.charAt(i).toUpperCase());
      } else {
        convertedTweetArray.push(result.charAt(i));
      }
    }
    return convertedTweetArray;
  })

  //join array to form tweet string

  .then(function(result) {
    // console.log(`Line 44 result: ${result}`)
    convertedTweet = result.join('');
    console.log(convertedTweet);
    return convertedTweet;
  })

  //post tweet

  .then(function(result){
    T.post('statuses/update', {status: `Tan: "${originalTweet}"\nme: ${result}`}, function(err, data, response) {
      if (err) {
        console.log('no tweet went out');
        console.log(err);
      } else {
        console.log('tweeted!');
      }
    });
  })
