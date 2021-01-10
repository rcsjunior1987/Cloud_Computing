const {
  SentimentManager
} = require('node-nlp');

const sentiment = new SentimentManager();

async function processTweets(tweets) {
  let sentimentQueue = [];
  let data = [];

  tweets.forEach(function (tweet) {
    sentimentQueue.push(getSentiment(tweet));
  });

  const sentimentResults = await Promise.all(sentimentQueue);
  for (const sentimentResult of sentimentResults) {
    data.push(sentimentResult);
  }

  return data;
}

async function getSentiment(tweet) {
  return new Promise(function (resolve, reject) {
    sentiment
      .process(tweet["language"], tweet["text"])
      .then(function (result) {
        const data = result["vote"];
        resolve(data);
      })
      .catch(function (e) {
        reject(e);
      });
  });
}

async function calculateSentiments(data) {
  let sentiments = []

  positiveValue = data.count("positive");
  negativeValue = data.count("negative");
  neutralValue = data.count("neutral");

  total = (positiveValue + negativeValue + neutralValue)

  if (total > 0) {

    sentiments = [
      {
          'tag': 'positive',
          'value': (positiveValue / total) * 100
      },
      {
          'tag': 'negative',
          'value': (negativeValue / total) * 100
      },
      {
          'tag': 'neutral',
          'value': (neutralValue / total) * 100
      }
    ];
  }

  return sentiments;
}


Object.defineProperties(Array.prototype, {
  count: {
      value: function(query) {
          var count = 0;
          for(let i=0; i < this.length; i++)
              if (this[i]==query)
                  count++;
          return count;
      }
  }
});

module.exports = {
  processTweets: processTweets,
  getSentiment: getSentiment,
  calculateSentiments: calculateSentiments
}