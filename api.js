require("dotenv").config();
require("./config/db");

const axios = require('axios');
const gameModel = require('./models/Game.model');
const gameRoute = require('./routes/games.route')

const migrate = async () => {
    const api = axios.create({
        baseURL: 'https://api.rawg.io/api/games?key=cbb5b86f21b641e194e2cf3dde368951&page=3'
    })
    
    try {
        const result = await api.get(
            ""
        )
        console.log(result.data.results[0])
    
        const myApi = axios.create({
            baseURL: 'http://localhost:5000/games'
        })

        const list = result.data.results

        for (let i = 0; i < list.length ; i++) {
            const game = list[i];
            // console.log(game)
            delete game.id;
            delete game.ratings;
    
            const resultGame = await myApi.post('', game);
            console.log(resultGame)
        };
        
    } catch (error) {
        console.log(error)
    } finally { 
        console.log('--------------FINISH---------------')
    }


}

migrate()