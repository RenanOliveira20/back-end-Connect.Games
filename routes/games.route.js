const { Router } = require('express');
const Game = require('../models/Game.model');
const router = Router();

router.get('/all', async (req, res) => {
    try {
        const games = await Game.find();
        res.status(200).json(games);

    } catch (error) {
        res.status(500).json({message: 'Error to get all games', error});
    };
});

router.get('/:id', async (req, res) => {
    const { id } = req.params; 

    try {
        const logGame = await Game.findOne({ _id: id });
        
        if(!logGame){
            throw new Error("Game not found");
        };

        res.status(200).json(logGame);

    } catch (error) { 
        res.status(500).json({ message: 'Error on find game', error });
    };
});

router.post('/', async (req, res) => {
  
    if(!req.body.name) {
        return res.status(400).json({message: 'Missing name field'});
    };

    try {
        await Game.create(req.body);

        res.status(201).json({ message: 'Game created sucessful'});

    } catch (error) {
        res.status(500).json({messag: 'Error while creating game', error});
    };
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const payload = req.body;

    try {
        const updateGame = await Game.findOneAndUpdate({ _id: id }, payload, { new: true });

        res.status(200).json(updateGame);

    } catch (error) {
        res.status(500).json({message:'Error while updating game', error});
    };
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Game.findByIdAndDelete(id);

        res.status(201).json({message: 'Game deleted sucessful'});

    } catch (error) {
        res.status(500).json({message: 'Error while deleting game', error});
    };
});

module.exports = router
