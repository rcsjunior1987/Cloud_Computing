const express = require('express');
const router = express.Router();
const logger = require("morgan");
const axios = require("axios");
router.use(logger("tiny"));

const teamsRouter = require('./teams');

const league = teamsRouter.league;

router.get('/:idTeam', (req, res) => {

    const url = createPlayersOptions(req.params.idTeam);
    
    axios.get(url)
        .then((response) => {
            res.writeHead(response.status,{'content-type': 'text/html'});
            return response.data;
    })
    .then( (rsp) => {
        const s = createPage('Players ', rsp);
        res.write(s);
        res.end();
    })
    .catch((error) => {
        console.error(error);
    })

});

function createPlayersOptions(idTeam) {
    const options = {
        hostname: "https://thesportsdb.com",
        path: "/api/v1/json/4013017/lookup_all_players.php?"
    }

    const str = 'id=' + idTeam

    options.path += str;

    return options.hostname + options.path;
}

function parsePhotoRsp(rsp) {

    let s = `<ul class="list-group list-group-horizontal divPlayers1">`;

    for (let i = 0; i < rsp.player.length; i++) {
        player = rsp.player[i];

        if ( (i % 6) == 0){
            s += ` 
                </ul>
                    <ul class="list-group list-group-horizontal divPlayers1">`;

        }

        s += `
             <li class="list-group-item liPlayers" >
                   <div class="divPlayers1">
                       <img class="imgPlayer"
                            alt="${player.strPlayer}"
                            src="${player.strRender}/preview "/>
                   </div>
                   <div class="divPlayers2">
                       <h7>   ${player.strPlayer}  </h7>
                   </div>
                   <div class="divPlayers3">
                       <h7>   #${player.strNumber}  </h7>
                   </div>
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
                    <body>
                        <div class="div1">
                            <h7>
                                <a class="mainLink"
                                    href="/search/${league.id}/${league.season}">
                                    Go to teams page
                                </a>
                            </h7>
                        </div>
                        <div class="div2">
                            <h6> `+ title + ` </h6>`+
                                imageString +
                       `</div>
                    </body>
                </html>`;
    return str;
}

module.exports = router;