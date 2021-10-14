const { Router } = require("express");
const ObjectID = require('mongoose')
const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");
const User = require("../models/User.model");

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ _id: id }).populate(["user", "comments"]);
    if (!post) {
      throw new Error(`don't find a post`);
    }
    res.status(200).json(post);
  } catch (error) {}
});

router.post("/:id/comment", async (req, res) => {
  const { id } = req.params;
  const commentBody = { ...req.body };
  try {
    const newComment = await Comment.create({
      text: commentBody.text,
      user: req.user.id,
    });
    const reqComment = await Post.findOneAndUpdate(
      { _id: id },
      { $push: { comments: newComment._id } },
      { new: true }
    ).populate("comments");
    res.status(200).json({ message: "new comment to post" });
  } catch (error) {
    res.status(500).json({
      message: "error creating a comment for the post",
      error: error.message,
    });
  }
});

router.put("/:id/reactionsPost", async (req, res) => {
  const { id } = req.params;
  const { like, dislike } = req.body;

  const userID = req.user.id;
  try {
    if (like) {
      const postFromDb = await Post.findById(id);
      if (postFromDb.likes.includes(userID)) {
        postFromDb.likes.splice(postFromDb.likes.indexOf(userID), 1);
        postFromDb.save();
        res.status(200).json(postFromDb);
      } else {
        postFromDb.likes.push(userID);
        postFromDb.save();
        res.status(200).json(postFromDb);
        console.log(postFromDb);
      }
    }
    if (dislike) {
      const postFromDb = await Post.findById(id);
      if (postFromDb.dislikes.includes(userID)) {
        postFromDb.dislikes.splice(postFromDb.dislikes.indexOf(userID), 1);
        postFromDb.save();
        res.status(200).json(postFromDb);
      } else {
        postFromDb.dislikes.push(userID);
        postFromDb.save();
        res.status(200).json(postFromDb);
        console.log(postFromDb);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.put("/:id/reactionsComment", async (req, res) => {
  const { id } = req.params;
  const { like, dislike } = req.body;

  const userID = req.user.id;
  try {
    if (like) {
      const commentFromDb = await Comment.findById(id);
      if (commentFromDb.likes.includes(userID)) {
        commentFromDb.likes.splice(commentFromDb.likes.indexOf(userID), 1);
        commentFromDb.save();
        res.status(200).json(commentFromDb);
      } else {
        commentFromDb.likes.push(userID);
        commentFromDb.save();
        res.status(200).json(commentFromDb);
        console.log(commentFromDb);
      }
    }
    if (dislike) {
      const commentFromDb = await Comment.findById(id);
      if (commentFromDb.dislikes.includes(userID)) {
        commentFromDb.dislikes.splice(commentFromDb.dislikes.indexOf(userID), 1);
        commentFromDb.save();
        res.status(200).json(commentFromDb);
      } else {
        commentFromDb.dislikes.push(userID);
        commentFromDb.save();
        res.status(200).json(commentFromDb);
        console.log(commentFromDb);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//delete comment
router.delete('/:id/:commentId', async( req , res ) =>{
  const {id,commentId} = req.params;
  const logUser = req.user.id;
  try {
    const post = await Post.findOne({_id: id}).populate('comments');
    const comment = await Comment.findOne({_id: commentId})
    if(!comment){
      throw new Error (`Comment not find`)
    }
      if(!post){ 
      throw new Error('Post not find')
      }
      console.log(post.user,comment.user)
      if(await Post.findOne({$and :[{_id: id},{user: logUser}]}) || await Comment.findOne({$and :[{_id: id},{user: logUser}]})){
      const index = post.comments.findIndex(e => e._id === commentId);
      post.comments.splice(index,1)
      await Comment.findOneAndDelete({_id: commentId})
      res.status(200).json(`deleted a comment ${commentId}`)}
      throw new Error ('unauthorized')
  } catch (error) {
    res.status(500).json({
      message: "Error o delete the comment",
      error: error.message
    });
  };
}
);
module.exports = router;
