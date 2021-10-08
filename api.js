const axios = require('axios') 

const migrate = async () => {
    const api = axios.create({
        baseURL: 'https://api.rawg.io/api/games?key=cbb5b86f21b641e194e2cf3dde368951'
    })
    
    const result = await api.get(
        ""
    )
    console.log(result.data.results[0])

    const myApi = axios.create({
        baseURL: 'http://localhost:5000/games'
    })


    // for ( let i = 0 ; i < result.data.results.length ; i++) {
    //     const game = result.data.results[i]

    //     delete game.id

    //     const resultGame = await myApi.post('', game)
        
    // }

}

migrate()