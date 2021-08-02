const express = require('express');
const router = express.Router();

const streamClient = require("../modules/stream");
const sentimentClient = require("../modules/sentiment");
const twitterClient = require("../modules/twitter");

router.get('/',  async (req, res, next) => {

    req.params.query = "Trump"
    
    try {
        const contents = await twitterClient.downloadTwitterData(req.params.query);
        await streamClient.setTwitterData(contents);
        const tweets =  await streamClient.getTwitterData(req.params.query);
        const data = await sentimentClient.processTweets(tweets);
        const sentiments = await sentimentClient.calculateSentiments(data);
        return res.json(sentiments);
    } catch (e) {
      loggerUtil.error(e);
      next(e);
    }
    
});

module.exports = router;