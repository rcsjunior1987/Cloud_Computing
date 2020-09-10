const express = require('express');
const fs = require('fs');
const teamsRouter = require('./routes/teams');
const teamPlayersRouter = require('./routes/players');
const leagueTableRouter = require('./routes/table');

const app = express();

const hostname = '127.0.0.1';
const port = 3000;
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.writeHead(200,{'content-type': 'text/html'});
    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
            res.end('Could not find or open file for reading\n');
        } else {
            res.end(data);
        }
    });
});

app.use('/search', teamsRouter.router);
app.use('/result', teamPlayersRouter);
app.use('/table', leagueTableRouter);

app.listen(port, function () {
    console.log(`Express app listening at http://${hostname}:${port}/`);
});