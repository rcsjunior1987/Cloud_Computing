const express = require('express');
const responseTime = require('response-time')
const axios = require('axios');
const redis = require('redis');
const AWS = require('aws-sdk');
require('dotenv').config();

// Cloud Services Set-up
// Create unique bucket name
const bucketName = 'n10374647-wikipedia-store';
const app = express();

// This section will change for Cloud Services
const redisClient = redis.createClient();
redisClient.on('error', (err) => {
    console.log("Error " + err);
});

// Create a promise on S3 service object
const bucketPromise = new AWS.S3({apiVersion: '2006-03-01'})
    .createBucket({Bucket: bucketName})
    .promise();
bucketPromise
    .then(function(data) {
        console.log("Successfully created " + bucketName);
    })
    .catch(function(err) {
        console.error(err, "err.stack");
    });
// Used for header info later.
app.use(responseTime());

app.get('/api/search', (req, res) => {
  
    const query = (req.query.query).trim();
    const apiVersion = "2006-03-01";

    // Construct the wiki URL and key
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${query}`;

    const redisKey = `wikipedia:${query}`;

    // check the cache.
    return redisClient.get(redisKey, (err, result) => {

        console.log("into Search = " + redisKey);
        console.log("result = " + result);

        // If it is there,
        if (result) {

            console.log("If it is in cache, serve it.");

            // serve it from Cache
            const resultJSON = JSON.parse(result);
    
            return res.status(200).json(resultJSON);

        // If it isn’t there
        } else {           

            // Check S3 if it is in S3.
            const params = { Bucket: bucketName, Key: redisKey };

            return new AWS.S3({ apiVersion: apiVersion }).getObject(params,(err, result) => {
          
                // If it is in S3
                if (result) {

                    console.log("if it is in S3, serve it, but also store it in the cache.");

                    // serve it,
                    const resultJSON = JSON.parse(result.Body);
                    const responseJSON = resultJSON.parse;
               
                    // but also store it in the cache.
                    redisClient.setex(redisKey, 3600, JSON.stringify({ source: "Redis Cache", ...responseJSON }));

                    // Return S3 result
                    return res.status(200).json(resultJSON);

                // If it isn’t in S3 either
                } else {

                    console.log("go and get it from Wikipedia and store it in S3 and in the Cache.");
                    
                    // go to Wikipedia
                    return axios.get(searchUrl).then((response) => 
                    {
                        // and get it
                        const responseJSON = response.data;
        
                        // store it in Cache
                        redisClient.setex(redisKey, 3600, JSON.stringify({ source: "Redis Cache", ...responseJSON }));

                        // and in S3
                        const body = JSON.stringify({source: "S3 Bucket",...responseJSON,});
                        objectParams = {
                                Bucket: bucketName,
                                Key: redisKey,
                                Body: body,
                        };

                        const uploadPromise = new AWS.S3({ apiVersion: apiVersion }).putObject(objectParams).promise();
                        uploadPromise.then(function (data) {
                          console.log("Successful upload to ", bucketName, "/", redisKey);
                        });
        
                        return res.status(200).json({ source: "Wikipedia API", ...responseJSON });
                    })
                    .catch((err) => {
                        return res.json(err);
                    });
                }
            });
        }
    });
});

app.get('/api/store', (req, res) => {
    const key = (req.query.key).trim();

    // Construct the wiki URL and S3 key
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${key}`;
    const s3Key = `wikipedia-${key}`;
    
    // Check S3
    const params = { Bucket: bucketName, Key: s3Key};
    
    return new AWS.S3({apiVersion: '2006-03-01'}).getObject(params, (err, result) => {
        if (result) {
            // Serve from S3
            console.log(result);
            const resultJSON = JSON.parse(result.Body);
            return res.status(200).json(resultJSON);
    
        } else {
            // Serve from Wikipedia API and store in S3
            return axios.get(searchUrl)
                .then(response => {
                    const responseJSON = response.data;
                    const body = JSON.stringify({ source: 'S3 Bucket', ...responseJSON});
                    const objectParams = {Bucket: bucketName, Key: s3Key, Body: body};
                    const uploadPromise = new AWS.S3({apiVersion: '2006-03-01'}).putObject(objectParams).promise();
                    uploadPromise.then(function(data) {
                        console.log("Successfully uploaded data to " + bucketName + "/" + s3Key);
                    });
                    return res.status(200).json({ source: 'Wikipedia API', ...responseJSON, });
                })
            .catch(err => {
                return res.json(err);
            });
        }
    });
});

app.listen(3000, () => {
    console.log('Server listening on port: ', 3000);
});