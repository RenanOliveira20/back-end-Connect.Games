const { Router } = require("express");
const cloudinary = require("cloudinary").v2;
const uploadImage = require("../middlewares/feedpost.middleware");
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model.js");
const router = Router();

//get all posts in chronological order
router.get('/', async (req, res)=>{
    const {id} = req.user
    try {
        const feed =[]
        const user = await User.findOne({_id: id}).populate('following');
        user.posts.forEach((e)=>{
          feed.push(e)
        })
        user.following.forEach((e)=>{
          e.posts.forEach((e)=>{
            feed.push(e)
          })
        })
        feed.sort( (a ,b) => { 
        return a.createdAt - b.createdAt
      })
        res.status(200).json(feed)
    } catch (error) {
        res.status(500).json({
          message: 'Error to get all posts to feed',
          error: error.message
        })
    }
})

router.post("/", uploadImage.single("image"), async (req, res) => {
  let path = ''
  if (req.file){
    path = req.file.path
  }
  const { text } = req.body;
  const imageUrl = path

  try {
    if (!text && !imageUrl) {
      throw new Error("don't have image or text to post");
    }
    const newPost = await Post.create({
      text,
      imageUrl,
      user: req.user.id,
    });
    const userDb = await User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { posts: newPost } },
      { new: true }
    );
    res.status(200).json({ message: "new post inserted" });
  } catch (err) {
    res.status(500).json({ message: "erro to create a post", error: err });
  }
});

router.delete("/:idpost", async (req, res) => {
  const { id } = req.user;
  const { idpost } = req.params;

  try {
    const post = await Post.findById(idpost);
    const { imageUrl } = post;
    const imgArray = imageUrl.split('/');
    const img = imgArray[imgArray.length -1];
    const imgName = img.split('.')[0]
    await cloudinary.uploader.destroy(`ConnectGames/imagePost/${imgName}`);
    post.comments.forEach(async (element) => {
      await Comment.findOneAndDelete(element._id);
    });
    await Post.findOneAndDelete({ _id: idpost, user: id });
    const user = await User.findById(id);
    const index = user.posts.findIndex((element) => element._id === idpost);
    user.posts.splice(index, 1);
    user.save();
    res.status(200).json({ message: `Post successfully deleted` });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
