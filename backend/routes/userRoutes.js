const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getMyProfile,
 getUserById,
  updateProfile,
  toggleFollow,
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

/* public / common */
router.get("/", getAllUsers);

/* IMPORTANT: keep /me ABOVE /:id */
router.get("/me", authMiddleware, getMyProfile);
router.put("/me", authMiddleware, updateProfile);

/* follow */
router.put("/follow/:id", authMiddleware, toggleFollow);

/* single user profile */
router.get("/:id", getUserById);

module.exports = router;