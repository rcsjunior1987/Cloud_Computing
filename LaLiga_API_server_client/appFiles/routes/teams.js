const express = require('express');
const logger = require("morgan");
const router = express.Router();
const axios = require("axios");

router.use(logger("tiny"));

const league = {
    id: null,
    name: null
};

router.get('/:league/:season', (req, res) => {

    createLeague(req.params.league, req.params.season)

    const urlTeam = createTeamsOptions();

    axios.get(urlTeam)
        .then((response) => {
            return response.data;
    })
    .then((rsp) => {
        const s = createPage('league teams', rsp);
        res.write(s);
        res.end();
    })
    .catch((error) => {
        console.error(error);
    })

});

function createLeague(id, season) {
    league.id = id;
    league.season = season;
}

function createTeamsOptions() {
    const options = {
        hostname: 'https://thesportsdb.com',
        path: '/api/v1/json/1/lookup_all_teams.php?'
    }

    options.path += 'id=' + league.id

    return options.hostname + options.path;
}

function parsePhotoRsp(rsp) {
    
    let s = `<ul class="list-group list-group-horizontal ulTeams1">`;

    for (let i = 0; i < rsp.teams.length; i++) {
        team = rsp.teams[i];
        p_url = `/result/${team.idTeam}`;
        
        if ( (i % 5) == 0){
            s += ` </ul>
                   <ul class="list-group list-group-horizontal ulTeams1">`;
        }

        s += `
            <li class="list-group-item liTeams1">
                <a href="${p_url}" >
                    <div class="divTeams1">
                        <img class="imgPlayer" alt="${team.strTeam}" src="${team.strTeamBadge}/preview "/>
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
                                    href="/table/${league.id}/${league.season}">
                                    Go to season table ${league.season}
                                </a>

                                </br>

                                <a class="secondLink"
                                    href="../../">
                                    Go to leagues
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
    router: router,
    league: league
};