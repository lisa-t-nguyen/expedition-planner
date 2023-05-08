// importing the dependencies
import fetch from "node-fetch";
import express from "express"
import cors from "cors";
import helmet from "helmet";
import * as cheerio from 'cheerio';

const app = express();
app.use(helmet());
app.use(cors());

// defining an endpoint to call the DreamMS player stats API
app.get('/playerData/:playerName', async (req, res) => {
    fetch(`https://dreamms.gg/index.php?stats=${req.params.playerName}`)
    .then((response) => {
        return response.text();
    }).then((html) => {
        const $ = cheerio.load(html);

        const playerData = {};

        const playerNameElement = $('div.details > h3');
        const playerNameElementText = playerNameElement.text();
        if (playerNameElementText.length >= req.params.playerName.length){
            playerData.name = playerNameElementText.substring(playerNameElementText.length - req.params.playerName.length);
            if (playerData.name.toLowerCase() != req.params.playerName.toLowerCase()) {
                playerData.name = req.params.playerName;
            }
        } else {
            playerData.name = req.params.playerName;
        }

        const playerDataItems = $('div.card-body > ul.fa-ul > li');
        if (playerDataItems.length <= 0) {
            throw GenerateHttpError(`Player Data for '${req.params.playerName}' could not be retrieved!`, 404);
        }

        playerDataItems.each((index, element) => {
            const data = $(element).text().split(': ');

            if (data.length === 2) {
                const dataKeySplit = data[0].split(' ');
                let dataKey = dataKeySplit[0].toLowerCase();
                for (let i = 1; i < dataKeySplit.length; i++) {
                    dataKey += dataKeySplit[i];
                }

                const dataValue = data[1];

                playerData[dataKey] = dataValue;
            }
        });
        
        res.send(playerData);
    }).catch((error) => {
        res.status(error.code).send(error.message);
    });
});

function GenerateHttpError(message, code) {
    const error = new Error(message);
    error.code = code;
    return error;
}

// starting the server
app.listen(3001, () => {
    console.log('listening on port 3001');
});