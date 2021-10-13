const { Router } = require("express");
const User = require("../models/User.model");

const router = Router();

//pegar informações do user
router.get("/", async (req, res) => {
  const { id } = req.user;
  try {
    const logUser = await User.findOne({ _id: id });
    console.log(logUser);
    if (!logUser) {
      throw new Error("User not find");
    }
    res.status(200).json(logUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
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
        $and: [{ _id: id }, { followers: { $in: [`${idLogUser}`] } }]
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

//delete account !!
router.delete("/", async (req, res) => {
  const { id } = req.user;
  try {
    const deleteUser = await User.findOneAndDelete({ _id: id });
    res.status(200).json({ message: `User deleted` });
  } catch (error) {}
});
module.exports = router;
