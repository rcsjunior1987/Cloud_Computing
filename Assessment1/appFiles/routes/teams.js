const express = require('express');
const logger = require("morgan");
const router = express.Router();
const axios = require("axios");

router.use(logger("tiny"));

var league;

router.get('/:league/:season', (req, res) => {

    createLeague(req.params.league, req.params.season)
    
    const teamOptions = createTeamsOptions();
    let urlTeam = teamOptions.hostname + teamOptions.path;

    axios.get(urlTeam)
        .then((response) => {
            return response.data;
    })
    .then((rsp) => {
        const s = createPage('La league teams', rsp);
        res.write(s);
        res.end();
    })
    .catch((error) => {
        console.error(error);
    })

});

function createLeague(id, season) {

    league = {
        id: id,
        season: season
    };

}

function createTeamsOptions() {
    const options = {
        hostname: 'https://thesportsdb.com',
        path: '/api/v1/json/1/lookup_all_teams.php?'
    }

    options.path += 'id=' + league.id

    return options;
}

function parsePhotoRsp(rsp) {
    
    let s = `<ul class="list-group list-group-horizontal ulTeams1">`;

    for (let i = 0; i < rsp.teams.length; i++) {
        team = rsp.teams[i];
        p_url = `http://localhost:3000/result/${team.idTeam}/${team.strTeam}/${league.id}/${league.season}`;
        
        if ( (i % 5) == 0){
            s += ` </ul>
                   <ul class="list-group list-group-horizontal ulTeams1">`;
        }

        s += `
            <li class="list-group-item liTeams1">
                <a href="${p_url}" >
                    <div class="divTeams1">
                        <img style="height:100%;width:100%" alt="${team.strTeam}" src="${team.strTeamBadge}/preview "/>
                    </div>
                    <div class="divTeams2">
                        <h7> ${team.strTeam} </h7>
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
                        <title>Teams JSON</title>
                        <link rel="stylesheet"
                              href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
                              integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
                              crossorigin="anonymous">
                        <link rel="stylesheet" href="/styles.css">
                    </head>
                    <body >
                        <div class="div1">
                            <h7> <a class="mainLink"
                                    href="http://localhost:3000/table/${league.id}/${league.season}">
                                    Go to season table ${league.season}
                                </a>
                            </h7>
                        </div>
                        <div class="div2">
                            <h6>` + title +  `</h6>`
                                  + imageString +
                       `</div>
                    </body>
                 </html>`;
    return str;
}

module.exports = {
    router: router
  }