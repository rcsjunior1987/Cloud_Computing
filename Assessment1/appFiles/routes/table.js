const express = require('express');
const router = express.Router();
const logger = require("morgan");
const axios = require("axios");
router.use(logger("tiny"));

const league = {
    id: null,
    name: null
};

router.get('/:league/:season', (req, res) => {

    createLeague(req.params.league, req.params.season)

    const url = createPlayersOptions();  

    axios.get(url)
        .then((response) => {
            res.writeHead(response.status,{'content-type': 'text/html'});
            return response.data;
    })
    .then( (rsp) => {
        const s = createPage('Table season ' +  req.params.season, rsp);
        res.write(s);
        res.end();
    })
    .catch((error) => {
        console.error(error);
    })

});

function createPlayersOptions() {
    const options = {
        hostname: "https://thesportsdb.com",
        path: "/api/v1/json/1/lookuptable.php?"
    }

    const str = 'l=' + league.id
             + '&s=' + league.season;

    options.path += str;

    return options.hostname + options.path;
}

function createLeague(id, season) {
        league.id = id;
        league.season = season;
}

function parsePhotoRsp(rsp) {
    
    let s = `  
            <ul class="list-group list-group-horizontal ulTable">
                <li class="list-group-item liTable1">
                    TEAM
                </li>
                <li class="list-group-item liTable1">
                    WIN
                </li>
                <li class="list-group-item liTable1">
                    DRAW
                </li>
                <li class="list-group-item liTable1">
                    LOSS
                </li>
                <li class="list-group-item liTable1">
                    TOTAL
                </li>
            </ul>`;

    for (let i = 0; i < rsp.table.length; i++) {
        table = rsp.table[i];
        s += `  
             <ul class="list-group list-group-horizontal ulTable">
                <li class="list-group-item liTable1">
                    ${table.name}
                </li>
                <li class="list-group-item liTable1">
                    ${table.win}
                </li>
                <li class="list-group-item liTable1">
                    ${table.draw}
                </li>
                <li class="list-group-item liTable1">
                    ${table.loss}
                </li>
                <li class="list-group-item liTable1">
                    ${table.total}
                </li>
             </ul>`;
    }

    return s;
}

function createPage(title, rsp) {

    const imageString = parsePhotoRsp(rsp);

    const str = `<!DOCTYPE html>
                 <html>
                    <head>
                        <title>Teams JSON</title>
                        <meta charset="utf-8" />
                        <link rel="stylesheet"
                              href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
                              integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
                              crossorigin="anonymous">
                        </link>
                        <link rel="stylesheet" href="/styles.css">
                    </head>
                    <body>
                        <div class="divTable1">
                            <h4> <a class="mainLink"
                                    href="/search/${league.id}/${league.season}">
                                    Go to teams page
                                </a>
                            </h4>
                        </div>
                        <div class="divTable2">
                            <h6>` + title + `</h6>`
                                  + imageString +
                       `</div>
                    </body>
                 </html>`
    return str;
}

module.exports = router;