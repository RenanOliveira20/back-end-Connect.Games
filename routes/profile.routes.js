const { Router } = require("express");
const User = require('../models/User.model');

const router = Router();


router.get('/', async (req,res) =>{
    const {id} = req.user;
    try {
        const logUser = await User.findOne({_id: id})
        console.log(logUser)
        if(!logUser){
            throw new Error ('User not find')
        };
        res.status(200).json(logUser)
    } catch (error) {
    res.status(500).json({error: error.message})        
    }
})
router.put ('/following', async (req, res) =>{
    
})
module.exports = router
