const User = require("../models/User");
const Post = require("../models/Post");

/* ================= GET ALL USERS ================= */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.log("Get users error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/* ================= GET MY PROFILE ================= */
const getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.log("Get profile error:", error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

/* ================= GET USER BY ID ================= */
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const posts = await Post.find({ user: user._id })
      .populate("user", "username profilePic")
      .sort({ createdAt: -1 });

    res.json({
      user,
      posts,
    });
  } catch (error) {
    console.log("Get user by id error:", error);
    res.status(500).json({ message: "Failed to fetch user profile" });
  }
};

/* ================= UPDATE MY PROFILE ================= */
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { bio, profilePic } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { bio, profilePic },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.log("Update profile error:", error);
    res.status(500).json({
      message: error.message || "Failed to update profile",
    });
  }
};

/* ================= FOLLOW / UNFOLLOW ================= */
const toggleFollow = async (req, res) => {
  try {
    const currentUserId = req.user.id || req.user._id;
    const targetUserId = req.params.id;

    if (currentUserId.toString() === targetUserId.toString()) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFollowing = currentUser.following.some(
      (id) => id.toString() === targetUserId.toString()
    );

    if (isFollowing) {
      currentUser.following = currentUser.following.filter(
        (id) => id.toString() !== targetUserId.toString()
      );

      targetUser.followers = targetUser.followers.filter(
        (id) => id.toString() !== currentUserId.toString()
      );
    } else {
      currentUser.following.push(targetUserId);
      targetUser.followers.push(currentUserId);
    }

    await currentUser.save();
    await targetUser.save();

    res.json({
      message: isFollowing ? "Unfollowed successfully" : "Followed successfully",
      following: currentUser.following,
      followers: targetUser.followers,
    });
  } catch (error) {
    console.log("Follow/unfollow error:", error);
    res.status(500).json({ message: "Failed to follow/unfollow user" });
  }
};

module.exports = {
  getAllUsers,
  getMyProfile,
  getUserById,
  updateProfile,
  toggleFollow,
};