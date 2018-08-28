const Twit = require('twit');
const fs = require('fs');
const config = require('./config.js')

const T = new Twit(config);

module.exports = function mockingSpongeBob () {

  // Twitter @ names
  // targetUser should be the @ name of the user your bot your bot is to mock
  let targetUser = 'tanner_johnson';

  let targetTweetsParams = {
    screen_name: targetUser,
    count: 1,
    exclude_replies: true,
    include_rts: false
  };

  let originalTweet;
  let convertedTweetArray = [];
  let convertedTweet;
  let mockingImage = fs.readFileSync('./assets/mocking-sb.jpg', {encoding: 'base64'});

  //
  // Get users most recent tweet that isn't a reply or a retweet
  //

  T.get('statuses/user_timeline', targetTweetsParams)
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

    //upload media to twitter

    .then(function(result) {
      T.post('media/upload', {media_data: mockingImage}, function(err, data, response) {
        // console.log('media string for image is: ', data.media_id_string);
        let mediaId = data.media_id_string;
        let altText = 'An image of an yellow sponge who\'s back is bent forward. He also is acting like a chicken.';
        let metaParams = {
          media_id: mediaId,
          alt_text: {
            text:altText
          }
        };
        //process media on twitter
        T.post('media/metadata/create', metaParams, function (err, data, response) {
          if(!err) {

            let tweetParams = {
              status: `tan: ${originalTweet}\nme: ${convertedTweet}`,
              media_ids: [mediaId]
            }
            //post tweet with media attached
            T.post('statuses/update', tweetParams, function(err, data, response) {
              if (err) {
                console.log('no tweets going out');
              } else {
                console.log('mOcKiNg tImE!');
              }
            })
          } else {
            console.log('media was not created!');
          }
        })
      })
    })
}
