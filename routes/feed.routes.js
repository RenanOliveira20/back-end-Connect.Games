const { Router } = require('express');
const User = require ('../models/User.model')
const Comment = require('../models/Comment.model');
const Post = require('../models/Post.model')
const router = Router();


router.put('/', async (req,res)=>{
    const {text, imageUrl, user} = req.body
    const userReq = {...req.user}
    try{    if(!text && !imageUrl){
            throw new Error("don't have image or text to post")
        }
        const userDb = await User.findOneAndUpdate({_id: userReq.id}, {posts: await Post.create({...req.body})},{new: true})
        console.log(userDb)
        res.status(200).json({message: 'new post inserted'})
    }catch(err){
    res.status(500).json({message: "erro to create a post", error: err})
    }
})

module.exports = router