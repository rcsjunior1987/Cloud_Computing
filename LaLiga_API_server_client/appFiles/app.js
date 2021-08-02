const express = require('express');
const logger = require("morgan");
const router = express.Router();
const axios = require("axios");

router.use(logger("tiny"));
const teamsRouter = require('./routes/teams');
const teamPlayersRouter = require('./routes/players');
const leagueTableRouter = require('./routes/table');

const app = express();

const hostname = '127.0.0.1';
const port = 3000;
app.use(express.static("public"));

app.get('/', (req, res) => {

    const teamOptions = createTeamsOptions();
    let urlTeam = teamOptions.hostname + teamOptions.path;

    axios.get(urlTeam)
        .then((response) => {
            return response.data;
    })
    .then((rsp) => {
        const s = createPage('', rsp);
        res.write(s);
        res.end();
    })
    .catch((error) => {
        console.error(error);
    })

});

function createTeamsOptions() {
    const options = {
        hostname: 'https://thesportsdb.com',
        path: '/api/v1/json/1/lookupleague.php?id=4335'
    }

    return options;
}

function parsePhotoRsp(rsp) {
    
    let s = `<ul class="list-group list-group-horizontal ulLeagues1">`;

    for (let i = 0; i < rsp.leagues.length; i++) {
        league = rsp.leagues[i];
        p_url = `/search/${league.idLeague}/2019-2020`;
        
        if ( (i % 5) == 0){
            s += ` </ul>
                   <ul class="list-group list-group-horizontal ulLeagues1">`;
        }

        s += `
            <li class="list-group-item liLeagues1">
                <a href="${p_url}" >
                    <div class="divLeagues1">
                        <img style="height:100%;width:100%" alt="${league.strLeague}" src="${league.strBadge}/preview "/>
                    </div>
                </a>
            </li>`;
    }

    s += `</ul>`;

    return s;
}

function createPage(title, rsp) {
    const imageString = parsePhotoRsp(rsp);

    const str = `<!DOCTYPE html>
                 <html>
                    <head>
                        <meta charset="utf-8" />
                        <title>Leagues JSON</title>
                        <link rel="stylesheet"
                              href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
                              integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
                              crossorigin="anonymous">
                        <link rel="stylesheet" href="/styles.css">
                    </head>
                    <body >
                        <div class="div2">
                            <h6>` + title +  `</h6>`
                                  + imageString +
                       `</div>
                    </body>
                 </html>`;
    return str;
}

app.use('/search', teamsRouter.router);
app.use('/result', teamPlayersRouter);
app.use('/table', leagueTableRouter);


app.listen(port, function () {
    console.log(`Express app listening at http://${hostname}:${port}/`);
});