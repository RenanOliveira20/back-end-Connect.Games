const {Router} = require('express');
const User = require('../models/User-Schema')
const bcrypt = require('bcryptjs')

const router = Router()

router.post('/signup', async (req,res)=>{
    const {name, username, password, email} = req.body;
    try{
        const usernames = await User.findOne({ username });
        if(usernames){
            throw new Error ('username already exists')
        }
        const emails = await User.findOne({ email })
        if(emails){
            throw new Error ('Email already exists')
        }
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password,salt)

        console.log(passwordHash)
        await User.create({
            name,
            username,
            password: passwordHash,
            email
        })
        res.status(201).json({message: 'user sucessful created'})
    } catch (error) {
        res.status(500).json({msg: 'Error while creating user', error: error.message})
    }
})
module.exports = router