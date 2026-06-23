const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");
const Post = require("./models/Post");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => console.log(err));

const seedData = async () => {
  try {
    await User.deleteMany();
    await Post.deleteMany();

    const password = await bcrypt.hash("123456", 10);

    const users = await User.insertMany([
      {
        username: "Aarav",
        email: "aarav@gmail.com",
        password,
        bio: "Tech enthusiast | Coffee lover ☕",
        profilePic: "https://i.pravatar.cc/150?img=11",
        followers: [],
        following: [],
      },
      {
        username: "Diya",
        email: "diya@gmail.com",
        password,
        bio: "Photography and travel 🌍📸",
        profilePic: "https://i.pravatar.cc/150?img=12",
        followers: [],
        following: [],
      },
      {
        username: "Rahul",
        email: "rahul@gmail.com",
        password,
        bio: "Frontend developer 🚀",
        profilePic: "https://i.pravatar.cc/150?img=13",
        followers: [],
        following: [],
      },
      {
        username: "Sneha",
        email: "sneha@gmail.com",
        password,
        bio: "Music, books and late-night coding 🎧",
        profilePic: "https://i.pravatar.cc/150?img=14",
        followers: [],
        following: [],
      },
      {
        username: "Kiran",
        email: "kiran@gmail.com",
        password,
        bio: "Fitness | Design | UI lover ✨",
        profilePic: "https://i.pravatar.cc/150?img=15",
        followers: [],
        following: [],
      },
    ]);

    await Post.insertMany([
      {
        user: users[0]._id,
        content: "Excited to join SocialSphere! 🚀",
        likes: [],
        comments: [],
      },
      {
        user: users[1]._id,
        content: "Captured a beautiful sunset today 🌅",
        likes: [],
        comments: [],
      },
      {
        user: users[2]._id,
        content: "Building a MERN social media app is fun 😍",
        likes: [],
        comments: [],
      },
      {
        user: users[3]._id,
        content: "Listening to music and coding all night 🎵💻",
        likes: [],
        comments: [],
      },
      {
        user: users[4]._id,
        content: "UI design can change the whole feel of an app ✨",
        likes: [],
        comments: [],
      },
    ]);

    console.log("Demo users and posts inserted successfully!");
    process.exit();
  } catch (error) {
    console.log("Seed error:", error);
    process.exit(1);
  }
};

seedData();