const Twit = require('twit');
const fs = require('fs');
const config = require('./config.js');
const twitter_users = require('./twitter-users.js');

const T = new Twit(config);

module.exports = function mockingSpongeBob () {

  let targetTweetsParams = {
    screen_name: twitter_users.target,
    count: 1,
    exclude_replies: true,
    include_rts: false
  };

  let originalTweet;
  let convertedTweetArray = [];
  let convertedTweet;
  let targetUserName;
  let mockingImage = fs.readFileSync('./assets/mocking-sb.jpg', {encoding: 'base64'});

  //
  // Get target user most recent tweet that isn't a reply or a retweet
  //

  T.get('statuses/user_timeline', targetTweetsParams)
    .catch(function (err) {
      console.log('unable to get tweet from target user');
    })

    // Check to see if tweet has been tweeted already

    .then(function(result) {
      console.log(result.data[0].text);
      targetUserName = result.data[0].user.name;
      let targetTweet = result.data[0].text;
      // reading archive.json
      let archive = fs.readFileSync('./archive.json', 'utf8');
      let convertedArchive = JSON.parse(archive);
      let archivedTweets = convertedArchive.archive;

      // shift archived tweets if it has more than 5 tweets archived

      if (archivedTweets.length >= 5) {
        archivedTweets.shift();
        console.log(archivedTweets);

        let newArchive = {
          archive: archivedTweets
        };
        let stringifyNewArchive = JSON.stringify(newArchive);
        fs.writeFileSync('./archive.json', stringifyNewArchive);
        console.log('beep boop I deleted a tweet archives.json');
        // check if target tweet has been archived
        for (let i = 0; i <= archivedTweets.length; i++) {
          if (targetTweet === archivedTweets[i]) {
            console.log('this tweet exists in archive.json');
            return false;
          } // add target tweet to archive.json
            else if (i === archivedTweets.length && targetTweet !== archivedTweets[i]) {
              archivedTweets.push(targetTweet);
              let newArchive = {
                archive: archivedTweets
              };
              let stringifyNewArchive = JSON.stringify(newArchive);
              fs.writeFileSync('./archive.json', stringifyNewArchive);
              console.log('newest tweet was added to archive.json');

              return targetTweet;
            }
        }

      }
      // if archive has less than 5 tweets
      // checking if tweet exists in archive.json

        else {
        console.log('archive is smaller than 5 tweets');
        // iterate over archive array to check if latest target tweet is logged
        for (let i = 0; i <= archivedTweets.length; i++) {
          if (targetTweet === archivedTweets[i]) {
            console.log('this tweet exists in archive.json');
            return false;
          }
            else if (i === archivedTweets.length && targetTweet !== archivedTweets[i]) {
            archivedTweets.push(targetTweet);
            let newArchive = {
              archive: archivedTweets
            };
            let stringifyNewArchive = JSON.stringify(newArchive)
            fs.writeFileSync('./archive.json', stringifyNewArchive);
            console.log('newest tweet has been added to archives');

            return targetTweet;
          }
        }
      }
    })

    // Format tweet in all lowercase

    .then(function(result) {
      console.log(`this is the result from the archive check:
         ${result}`);

      if (result === false) {
        console.log('tweet has been logged');
        return false;
      }
        else if (typeof result === 'string') {
        let tweet = result;
        originalTweet = tweet;
        // console.log(originalTweet[0]);
        let lowerCaseTweet = tweet.toLowerCase();
        console.log(`lowercase version of tweet: ${lowerCaseTweet}`);
        return lowerCaseTweet;
      }
    })

    //convert tweet in mocking form pushed to an array

    .then(function(result) {
      if (result === false) {
        console.log('tweet has been logged already');
        return false;
      }
        else if (typeof result === 'string') {
        console.log('bot is attempting to covert tweet to mocking form');
        for (let i = 0; i < result.length; i++) {
          if (i === 0 || i % 2 === 0) {
            convertedTweetArray.push(result.charAt(i).toUpperCase());
          } else {
            convertedTweetArray.push(result.charAt(i));
          }
        }
        console.log(convertedTweetArray);
        return convertedTweetArray;
      }
    })

    // join array to form the content of mocking tweet

    .then(function(result) {
      if (result === false) {
        console.log('tweet was posted centuries ago beep boop');
        return false;
      }
        else {
        convertedTweet = result.join('');
        console.log(convertedTweet);
        return convertedTweet;
        }
    })

    //upload media to twitter

    .then(function(result) {
      if (result === false) {
        console.log('tweet was posted a while back. just hold your horses bot');
      }
        else if (typeof result === 'string') {
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
                  status: `${targetUserName}: ${originalTweet}\nme: ${convertedTweet}`,
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
        }
    })
}
