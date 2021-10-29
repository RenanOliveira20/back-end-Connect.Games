const { Router } = require("express");
const User = require("../models/User.model");
const uploadImage = require("../middlewares/profilepicture.middleware");
const cloudinary = require("cloudinary").v2;
const router = Router();

//pegar informações do user
router.get("/", async (req, res) => {
  const { id } = req.user;
  try {
    const logUser = await User.findOne({ _id: id });
    if (!logUser) {
      throw new Error("User not find");
    }
    res.status(200).json(logUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// get otheer
router.get('/user/:id', async (req,res) =>{
  const {id} = req.params
  try {
    const user = await User.find({_id:id}).populate('posts', 'following', 'followers', 'favoriteGames');
    if(!user){ 
    throw new Error('user not find');
}
res.status(200).json(user)
  } catch (error) {
    
  }
} )

//follow and unfollow user
router.put("/", async (req, res, next) => {
  const { id, follow, unfollow } = req.body;
  const idLogUser = req.user.id;
  try {
    if (!follow && !unfollow) {
      throw new Error(`Don't have a action`);
    }
    let interactUser = await User.findOne({ _id: id });
    if (!interactUser) {
      throw new Error("user not find");
    }
    if (unfollow) {
      interactUser = await User.findOne({
        $and: [{ _id: id }, { followers: { $in: [`${idLogUser}`] } }],
      });
      if (!interactUser) {
        throw new Error(`You don't follow this user`);
      }
      interactUser = await User.findByIdAndUpdate(
        { _id: id },
        { $pull: { followers: idLogUser } }
      );
      const logUserUpdate = await User.findOneAndUpdate(
        { _id: idLogUser },
        { $pull: { following: id } }
      );
      res.status(201).json({ message: "unfollow user" });
    }
    if (follow) {
      interactUser = await User.findOne({
        $and: [{ _id: id }, { followers: { $in: [`${idLogUser}`] } }],
      });
      if (interactUser) {
        console.log(interactUser.followers);
        throw new Error("already follow the user");
      }
      interactUser = await User.findByIdAndUpdate(
        { _id: id },
        { $push: { followers: idLogUser } }
      );
      const logUserUpdate = await User.findOneAndUpdate(
        { _id: idLogUser },
        { $push: { following: id } }
      );
      res.status(201).json({ message: "follow user" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    next();
  }
});

router.put("/:id/favorite", async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { favorite } = req.body;

  try {
    const user = await User.findOne({ _id: userId });

    if (favorite) {
      user.favoriteGames.push(userId);
      user.save();
    }

    if (!favorite) {
      const index = user.favoriteGames.findIndex(
        (element) => element._id === id
      );

      user.favoriteGames.splice(index, 1);
      user.save();
    }

    res.status(200).json({ msg: "Favorite Game sucessful" });
  } catch (error) {
    res.status(500).json({ msg: "Error while favorite game" });
  }
});

//delete account !!
router.delete("/", async (req, res) => {
  const { id } = req.user;
  try {
    const deleteUser = await User.findOneAndDelete({ _id: id });
    res.status(200).json({ message: `User deleted` });
  } catch (error) {}
});

//cloudinary image user
router.put("/upload-profile-image", uploadImage.single("image"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ Error: "Image was not sent" });
    return;
  }
  const { path } = req.file;
  const { id } = req.user;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { profilePicture: path },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put("/profile-cover-image", uploadImage.single("image"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ Error: "Image was not sent" });
    return;
  }
  const { path } = req.file;
  const { id } = req.user;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { profileCover: path },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/delete-profile-image", async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    const { profilePicture } = user;
    const imgArray = profilePicture.split("/");
    const img = imgArray[imgArray.length - 1];
    const imgName = img.split(".")[0];
    await cloudinary.uploader.destroy(`ConnectGames/imageUser/${imgName}`);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { profilePicture: "" },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put("/delete-cover-image", async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findById(id);
    const { profileCover } = user;
    const imgArray = profileCover.split("/");
    const img = imgArray[imgArray.length - 1];
    const imgName = img.split(".")[0];
    await cloudinary.uploader.destroy(`ConnectGames/imageUser/${imgName}`);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { profilePicture: "" },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
