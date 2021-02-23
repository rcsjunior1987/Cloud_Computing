
1.	INTRODUCTION
La Liga mashup is a node-based software, part of the assessment one from CAB432 of Semester 1 in 2020. Throughout this software, a user clicks in the picture of a club from the Spanish soccer league to view who the team's current players are. Furthermore, the user may click in a link to view how the last season table looked after the matches played, possible by API's manipulation from the server-side and bootstrap, Html and CSS from the client-side. 
Sports DB API 
Home URL: thesportsdb.com/
Sports DB API is an open crowd-sourced database of sports artwork and metadata with free APIs generates by user contribution, which allows users to query teams, players in teams, player details, player contract details, and just about any player or team data from a broad range of sports such as soccer/football and handball (TheSportsDB, 2020).
2.	MASHUP USE CASES AND SERVICES

2.1	USER CASE 1
“As a user, I want to see a list of the clubs that made part of the season 2019-2020 from the Spanish soccer (called La Liga) to select the club I would like to have more information”.
 
Figure 1 - Homepage website.

 
Figure 2 - Clubs from La liga, season 2019-2020.

Figure 1 relies on the homepage from the website. This page allows the user to click in the La Liga logo, which will direct to the page of Figure 2, which illustrates the club's list that played La Liga in the season 2019-2020.
In this use case, the id of La Liga and also the season are passed as parameters to List All teams details in a league by Id API endpoint (https://www.thesportsdb.com/api/v1/json/API_KEY/lookup_all_teams.php?id=?). What will return a JSON object with the club's list that played La Liga in the season 2019-2020.
2.2	USER CASE 2
“As a user, I want to see a list of players from a specific club of La Liga.”
The page illustrated in Figure 2 is a list of all clubs from La Liga season 2019-2020, in which their Logo and name illustrate the clubs. This page allows a user to click on a club, redirecting another page that shows a list with the name, picture, and number of all players from the club chosen. For instance, a list shows in figure 3 will be shown whether the user clicks on the Real Madrid logo.
In this use case, the club's id is passed as a parameter to List All players in a team by Team Id API endpoint (https://www.thesportsdb.com/api/v1/json/API_KEY/lookup_all_players.php?id=?). What returns a JSON object with the players from the chosen club.
 
Figure 3 – Players from real Madrid.

2.3	USER CASE 3
“As a user, I want to see the last season's table after all the matches played.”
The screen illustrated in Figure 2 also permits the user to click in the link GO to season table 2019-2020, resulting in a page illustrated in Figure 4, which is a table with all clubs' total points after all the matches played in the last season, besides their quantity of win, draw, and loss.

In this use case, the league's id and season are passed as parameters to Lookup Table by League ID and Season API endpoint (https://www.thesportsdb.com/api/v1/json/API_KEY/lookuptable.php?l=?&s=?). What will return a JSON object with the club's description in the league's last season.
 
Figure 4 – Table of La Liga 2019-2020.

3.	TECHNICAL DESCRIPTION OF THE APPLICATION
The overall implementation of this service is built by JavaScript and CSS3 stylesheets in the Client-side and Node.js server to build the services in Docker containers. Their technique description is better explained bellow.
3.1	PROJECT DATA FLOW
A basic overall representation of the data flow is shows by the image bellow.
 
Figure 5 - La Liga mashup data flow.

3.2	PROJECT STRUCTURE
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
3.3	CLIENT
The client-side is responsible for sending requests to the server, getting the responses, and handles the pages and API's using HTML5, CSS3, and JavaScript.
