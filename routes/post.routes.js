const {Router} = require('express');
const Post = require('../models/Post.model');
const Comment = require('../models/Comment.model')
const User = require('../models/User.model')

const router = Router();

router.put('/:id', async (req, res)=>{
    const {id} = req.params;
    const commentBody = {...req.body}
    try {
        const reqPost = await Post.findOne({_id: id}).populate("user")
        const newComment = await Comment.create({
            text: commentBody.text,
            user:{...reqPost.user}
        })
        const reqComment = await Post.findOneAndUpdate({_id: id},{$push :{comments : newComment}},{new : true}).populate('comments');
        res.status(200).json({message: 'new comment to post'})
    } catch (error) {
        res.status(500).json({message: 'error creating a comment for the post',error : error})
    }

})
module.exports = router