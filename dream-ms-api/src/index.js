// importing the dependencies
import fetch from "node-fetch";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import * as cheerio from 'cheerio';

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to call the DreamMS player stats API
app.get('/:playerName', async (req, res) => {
    fetch(`https://dreamms.gg/index.php?stats=${req.params.playerName}`)
    .then((response) => {
        return response.text();
    }).then((html) => {
        const $ = cheerio.load(html);
        const playerDataItems = $('div.card-body > ul.fa-ul > li');

        const playerData = {};
        playerData.Name = req.params.playerName;
        playerDataItems.each((index, element) => {
            const data = $(element).text().split(': ');

            if (data.length === 2) {
                const dataName = data[0];
                const dataValue = data[1];

                playerData[dataName] = dataValue;
            }
        });
        
        res.send(playerData);
    }).catch((error) => {
        res.send(error);
    });
});

// starting the server
app.listen(3001, () => {
    console.log('listening on port 3001');
});