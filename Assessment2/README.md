
# 1.	INTRODUCTION

The software developed provides a resource for users to follow a comparative sentiment analysis from the American presidential candidates Mr. Trump and Mr. Biden on Tweets coming in from all around the world in real-time. The service automatically identifies and categorizes opinions expressed in a tweet to determine whether the opinion expressed about Mr. Trump or Mr. Biden is positive, negative, or neutral. And then, demonstrate as percentage of positive, negative, and neutral comments in a Real-time pie chart, which automatically updates every three minutes, which causes scaling on the AWS instances.

# 2.	TECHNICAL DESCRIPTION

## 2.1	MODULES

The application developed contains four modules. That is Aws, Sentiment, Stream, and Twitter. The module Aws is a bridge between the application and AWS DynamoDB, and it is the model responsible for uploading and downloading data in the database and verify whether a tweet exists as data in the database. The module Twitter connects to the Twitter endpoint returning the Twitter API about the American presidential candidates. The module Stream converts the Twitts API in JSON in save those in array to be understood by the module Sentiment, which performs the sentiment analysis of both candidates and calculates the percentual of good, bad, or neutral comments of both to be pop up on the screen as two pie charts representing each candidate.

### 2.2	APIS AND TECHNOLOGIES UTILISED

#### NodeJS [1]
It is an open-source and cross-platform JavaScript runtime environment. It is used to handle serving files as well as send requests and receive responses from APIs and Databases used in the Tweet Stream, Sentiment Analysis Processing, and Application Client section.

#### Express JS [2]
A web framework that sets the routes and views, allowing the client and server-side to be integrated, which allows for rapid development. It is used in the Sentiment Analysis processing and Application Client.

#### Twit [3]

Twitter’s streaming API is utilized to gather data for sentiment analysis on tweets. It connects to Twitter’s endpoint that provides tweets in real-time about Mr. Trump and Mr. Biden throughout HTTP requests.

#### Sentiment [4]

A Node.js module that performs sentiment analysis for the application once the twits are already collected, using AFINN-165-word list and Emoji Sentiment Ranking to analyze the sentiment ranking for arbitrary text blocks input.

#### AWS-SDK

A JavaScript library that enables developers to use AWS services in node.js. It is used as a bridge between the application and DynamoDB, permitting the upload and download of tweets.

#### Google Charts

Google Charts is a JavaScript API that allows structured data to be displayed in a visual diagram. It is used to display the sentiment analyzes of both presidential candidates in a pie chart.

#### AWS Elastic Load Balance

An AWS Elastic Load Balancer automatically distribute incoming application traffic across multiple targets. Tweetstorm utilises a load balancer in front of the Auto Scaling Group, this handles the large amounts of traffic coming in from the Twitter Stream to the Sentiment Analysis Servers and balances the traffic.

#### AWS Auto-Scaling Group

An AWS Auto-Scaling Group allows EC2 instances to be created dynamically based on defined conditions, this was utilised to balance the required number of instances in order to provide an application that is consistent despite the volume of task being completed.

#### JavaScript

This client-side of Javascript enables interactive features and dynamic functions. It
is used to count the emotions of tweets and displays the overall sentiment.

#### Bootstrap

Most popular HTML, CSS and JavaScript framework used to develop simple and
consistent UI for web page. It contains the HTML and CSS based design template
for typography, forms, buttons, navigation and other interface components. The
web pages in this services are styled using Bootstrap components.
Docker
Docker was utilised to encapsulate the application into a container for easy download and access.
The figure below depicts the Dockerfile utilised for the containerisation of Tweet Your SentimentThe
build is derived from version 10 of node. The source code is then copied into the base directory of
the image along with setting the work directory for that source code. The RUN command is then
performed to install the required Node packages for the Docker image. Finally, port 3000 is exposed
and the necessary commands are utilised to run the application.

#### AWS DynamoDB

A no SQL database service that stores and retrieves any amount of data, and serve any level of request traffic.

# 3.	REFERENCES

[1] N. Foundation, "Node.js", Node.js, 2017. 
[Online]. Available: https://nodejs.org/en/. [Accessed: 10- Nov- 2020]. 

[2] Express, "Express - Node.js web application framework", Expressjs.com. 
[Online]. Available: https://expressjs.com. [Accessed: 10- Nov- 2020]. 


[3] T. Tezel, "twit", npm, 2017. 
[Online]. Available: https://www.npmjs.com/package/twit. [Accessed: 10- Nov- 2020].

[4] A. Sliwinski, "sentiment", npm, 2017. 
[Online]. Available: https://www.npmjs.com/package/sentiment. [Accessed: 10- Nov- 2020]

