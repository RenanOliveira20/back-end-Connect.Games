const {Router} = require('express');
const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model')
const User = require('../models/User.model')

const router = Router();

router.get('/:id', async (req, res)=>{
    const {id} = req.params;
    try {
        const post = await Post.findOne({_id: id}).populate(['user', 'comments'])
        if(!post){
            throw new Error(`don't find a post`)
        }
        res.status(200).json(post)
    }catch(error){

    }
})

router.put('/:id/comment', async (req, res)=>{
    const {id} = req.params;
    const commentBody = {...req.body}
    try {
        const newComment = await Comment.create({
            text: commentBody.text,
            user: req.user.id
        })
        const reqComment = await Post.findOneAndUpdate({_id: id},{$push : {comments : newComment._id}},{new : true}).populate('comments');
        res.status(200).json({message: 'new comment to post'})
    } catch (error) {
        res.status(500).json({message: 'error creating a comment for the post',error : error.message})
    }
    
})
module.exports = router