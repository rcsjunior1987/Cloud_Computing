
### 1.	INTRODUCTION

Throughout this software, a user clicks in the picture of a club from the Spanish soccer league to view who the team's current players are. Furthermore, the user may click in a link to view how the last season table looked after the matches played, possible by API's manipulation from the server-side and bootstrap, Html and CSS from the client-side. 

#### Sports DB API

#### Home URL: thesportsdb.com/
Sports DB API is an open crowd-sourced database of sports artwork and metadata with free APIs generates by user contribution, which allows users to query teams, players in teams, player details, player contract details, and just about any player or team data from a broad range of sports such as soccer/football and handball.

### 2.	USER CASE 1

As a user, I want to see a list of the clubs that made part of the season 2019-2020 from the Spanish soccer (called La Liga) to select the club I would like to have more information.

![alt text](<./bin/images/homePage.jpg>)
##### Figure 1 - HomePage.

![alt text](<./bin/images/clubs.jpg>)
##### Figure 2 - Clubs from La liga, season 2019-2020.

## 2.	TECHNICAL DESCRIPTION OF THE APPLICATION
The overall implementation of this service is built by JavaScript and CSS3 stylesheets in the Client-side and Node.js server to build the services in Docker containers. The client-side, which is responsible for sending requests to the server, getting the responses, and handles the pages and API's using HTML5, CSS3, and JavaScript.

## 3	PROJECT STRUCTURE
The project structure is a general Express Node.js web application that separates the different parts of the app and makes the code easier to maintain. A brief explanation of this structure is shown below.
APPFILES/
	/public - Contain the CSS File.
	      /Styles.css
	/routes – Contain the app routes.
	     /players.js
	     /table.js
	     /teams.js
	App.js - Initialize the app and glue everything together.
	Package.json – Description of all packages that the app depends and their versions.
