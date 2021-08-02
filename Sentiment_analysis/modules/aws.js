const AWS = require('aws-sdk');
const dateFormat = require('dateformat');

AWS.config.loadFromPath('./config/awsConfig.json');

const TABLE_NAME = 'CAB432_Assessment_2';

var docClient = new AWS.DynamoDB.DocumentClient();            

async function uploadContent(object) {
    var params = {
      TableName: TABLE_NAME,
      Item: {
             "TWEET_ID": object.id,
             "STORED_TIME": dateFormat(object.date, "yyyy-mm-dd"),
             "PRESIDENT": object.president,
             "dummy_attribute": "dummy",
             "body": JSON.stringify(object)
       }
     };

     await docClient.put(params).promise();
}

async function downloadContent(object) {
  var params = {
      TableName: TABLE_NAME,
      Key:{
          "TWEET_ID": object.id
      }
  };

  const result = await docClient.get(params).promise();
  return result.Item;
}

async function isDataExisting(object) {
  var params = {
    TableName: TABLE_NAME,
    FilterExpression: "TWEET_ID = :id",
    ExpressionAttributeValues: {
      ":id": object.id
    }
    
  };

  const result = await docClient.scan(params).promise();
  return (result.Items.length == 0) ? false : true;
}

async function getDataAWeekPeriod(presidentName) {
  const today = new Date();

  var params = {
    TableName: TABLE_NAME,
    FilterExpression: "STORED_TIME <= :today and PRESIDENT = :presidentName",
    ExpressionAttributeValues: {
      ":today": dateFormat(today, "yyyy-mm-dd"),
      ":presidentName": presidentName
    }
    
  };

  const result = await docClient.scan(params).promise();
  return result.Items
}

module.exports = {
    isDataExisting: isDataExisting,
    uploadContent: uploadContent,
    downloadContent: downloadContent,
    getDataAWeekPeriod: getDataAWeekPeriod
};
