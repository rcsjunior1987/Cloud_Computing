const config = require('../config/twitterConfig.js');

const Twitter = require('twit');
const client = new Twitter({
  consumer_key: config.twitter.consumer.key,
  consumer_secret: config.twitter.consumer.secret,
  access_token: config.twitter.access.key,
  access_token_secret: config.twitter.access.secret,
  timeout_ms: 60 * 1000,
  strictSSL: true, 
});

async function downloadTwitterData(query) {
  return new Promise(function (resolve, reject) {
    let data = [];

    client.get('search/tweets', {
      q: "#" + query + " -filter:retweets lang:en",
      count: 200,

    }, function (error, tweets) {
      if (!error) {
        for (i = 0; i < tweets.statuses.length; i++) {
          tweet = tweets["statuses"][i];

          let processedTweet = {};
          processedTweet["id"] = tweet["id_str"];
          processedTweet["text"] = tweet["text"];
          processedTweet["date"] = tweet["created_at"];
          processedTweet["president"] = query;
      
          data.push(processedTweet);
        }
        resolve(data);
      } else {
        reject(error);
      }
    });
  });
}

module.exports = {
  downloadTwitterData: downloadTwitterData
}