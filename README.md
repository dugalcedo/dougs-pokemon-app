# Doug's pokemon app

An app made during a short time constraint for an interview process at Swedish company Scania.

This is a full-stack web application which utilizes the PokéAPI.

In this app, it is possible to create and/or load a player save file. Upon creating a new player, the user is asked to pick a region and pokemon. The 27 starter pokemon from the 9 regions of the pokemon franchise are displayed. When the user picks a pokemon, they are then allowed to choose between all of the locations in that region, then all of that location's areas, where they will encounter a random pokemon. The pokemon encounter is selected out of a pool of only those pokemon which naturally appear in that location. The rarer the pokemon, the lower the chances of encountering it. Then, the user may start a fight where the damage inflicted on the opponent pokemon is calculated based on the type of move and the type of pokemon (as certain types are stronger/weaker against other types). Additionally, the difference in levels between the player's pokemon and the opposing pokemon contribute to the damage dealt. For example, if the player tries to attack a pokemon of a much higher level, it won't do as much damage.

The app is missing several features one might expect based on the presentation, since I made it over the course of 9 days, where I didn't have too much free time.

## Tech Stack

Backend: Typescript, Express, SQLite, Sequelize

Frontend: Typescript, Svelte

## Installation

You must have node installed.

1. Clone the repo

2. cd into the main folder and run `npm run install-all`

3. To start, run `npm run dev` then open localhost:6393 in your browser.