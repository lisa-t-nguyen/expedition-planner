# dream-ms-api

## Description

An unofficial API for retrieving player data from `https://dreamms.gg/` via web scraping.

## Getting Started

To run this API locally, `cd` into the `dream-ms-api` project and run `npm install` to install any dependencies. Then run `npm start` to run the API.

## Available Requests

### Get Player Data

#### Request

`GET /playerData/:playerName/`

#### Response

    {
        "name": "Azuly",
        "job": "Dark Knight",
        "level": "234",
        "exp": "9,020,401,116",
        "fame": "36",
        "guild": "Apples",
        "alliance": "Orchard",
        "partner": "Alsiel",
        "familyLeader": "Cash",
        "playTime": "N/A",
        "dpm": "92,961,960",
        "deaths": "N/A",
        "omokWins": "7/18",
        "monsterBook": "N/A",
        "zakumKills": "N/A",
        "horntailKills": "N/A",
        "chaosZakumKills": "N/A",
        "chaosHorntailKills": "N/A",
        "pinkBeanKills": "N/A"
    }