const Twit = require('twit');
const config = require('./config.js')

//Set up keys for using Twit module

const T = new Twit(config);

//
// Check user most recent tweets
//

let getTweetsParams = {
  screen_name: 'powpowson',
  count: 1,
  exclude_replies: true,
  include_rts: false
};

T.get('statuses/user_timeline', getTweetsParams, modifyTweet);

function modifyTweet (err, data, response) {
  console.log(data);
  console.log(data[0].text);
  let tweet = data[0].text;
  let lowerCaseTweet = tweet.toLowerCase();
  console.log(lowerCaseTweet);
};

//
// Post tweet
//
let postTweetParams = {
  status: 'hello world!',
}

T.post('statuses/update', postTweetParams, )

function(err, data, response) {
  console.log(data)
}
