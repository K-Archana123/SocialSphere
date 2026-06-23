const Post = require("../models/Post");
const User = require("../models/User");

// CREATE POST
const createPost = async (req, res) => {
  try {
    const post = await Post.create({
      user: req.user.id,
      content: req.body.content,
    });

    const populatedPost = await Post.findById(post._id).populate(
      "user",
      "username profilePic"
    );

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SMART FEED POSTS
const getPosts = async (req, res) => {
  try {
    const currentUserId = req.user.id || req.user._id;

    const currentUser = await User.findById(currentUserId);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const followingIds = currentUser.following || [];

    const posts = await Post.find({
      user: {
        $in: [currentUserId, ...followingIds],
      },
    })
      .populate("user", "username profilePic")
      .populate("comments.user", "username profilePic")
      .sort({ createdAt: -1 });

    if (posts.length < 5) {
      const existingPostIds = posts.map((p) => p._id);

      const extraPosts = await Post.find({
        _id: { $nin: existingPostIds },
      })
        .populate("user", "username profilePic")
        .populate("comments.user", "username profilePic")
        .sort({ createdAt: -1 })
        .limit(10);

      return res.json([...posts, ...extraPosts]);
    }

    res.json(posts);
  } catch (error) {
    console.log("Get posts error:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// GET POSTS BY USER
const getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id })
      .populate("user", "username profilePic")
      .populate("comments.user", "username profilePic")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.log("Get user posts error:", error);
    res.status(500).json({ message: "Failed to fetch user posts" });
  }
};

// LIKE / UNLIKE POST
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user.id;

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// COMMENT ON POST
const commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({
      user: req.user.id,
      text: req.body.text,
    });

    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate("user", "username profilePic")
      .populate("comments.user", "username profilePic");

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EDIT POST
const updatePost = async (req, res) => {
  try {
    const { content } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can edit only your own post" });
    }

    post.content = content || post.content;
    await post.save();

    const updatedPost = await Post.findById(post._id)
      .populate("user", "username profilePic")
      .populate("comments.user", "username profilePic");

    res.json(updatedPost);
  } catch (error) {
    console.log("Update post error:", error);
    res.status(500).json({ message: "Failed to update post" });
  }
};

// DELETE POST
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can delete only your own post" });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("Delete post error:", error);
    res.status(500).json({ message: "Failed to delete post" });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostsByUser,
  likePost,
  commentPost,
  updatePost,
  deletePost,
};