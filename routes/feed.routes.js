const { Router } = require('express');
const User = require ('../models/User.model')
const Post = require('../models/Post.model')
const router = Router();


router.put('/', async (req,res)=>{
    const {text, imageUrl} = req.body
    try{    
        if(!text && !imageUrl){
            throw new Error("don't have image or text to post")
        }
        const newPost = await Post.create({
            text,
            imageUrl,
            user: req.user.id
        })
        const userDb = await User.findOneAndUpdate({_id: req.user.id},{$push: {posts : newPost}} ,{new: true})
        res.status(200).json({message: 'new post inserted'})
    }catch(err){
    res.status(500).json({message: "erro to create a post", error: err})
    }
})

module.exports = router