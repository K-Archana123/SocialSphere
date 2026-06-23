const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
 getPostsByUser,
  likePost,
  commentPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getPosts);
router.get("/user/:id", authMiddleware, getPostsByUser);

router.post("/", authMiddleware, createPost);
router.put("/like/:id", authMiddleware, likePost);
router.post("/comment/:id", authMiddleware, commentPost);

// NEW
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;