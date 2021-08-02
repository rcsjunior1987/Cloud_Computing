const express = require('express');
const router = express.Router();

const awsClient = require("./aws");

async function setTwitterData(contents) {

    await contents.forEach(async function(object) {

      if (!await awsClient.isDataExisting(object)) {
        await awsClient.uploadContent(object)
      }

    });

}

async function getTwitterData(presidentName) {
  const content = await awsClient.getDataAWeekPeriod(presidentName);
  const data = [];
  content.forEach(function (value) { data.push(JSON.parse(value.body)); });
  return data
}

module.exports = {
  setTwitterData: setTwitterData,
  getTwitterData : getTwitterData
}