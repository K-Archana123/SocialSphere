import { useEffect, useState } from "react";
import API from "../api";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";

const demoStories = [
  { name: "Aarav", pic: "https://i.pravatar.cc/100?img=11" },
  { name: "Diya", pic: "https://i.pravatar.cc/100?img=12" },
  { name: "Kiran", pic: "https://i.pravatar.cc/100?img=13" },
  { name: "Sneha", pic: "https://i.pravatar.cc/100?img=14" },
  { name: "Rahul", pic: "https://i.pravatar.cc/100?img=15" },
];

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
      console.log("Fetched posts:", res.data); // check if image field is coming
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setSuggestedUsers(res.data.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  const handleCreatePost = async () => {
    if (!content.trim() && !image.trim()) return;

    try {
      const res = await API.post("/posts", {
        content,
        image,
      });

      console.log("Created post:", res.data); // check if image saved
      setContent("");
      setImage("");
      fetchPosts();
    } catch (error) {
      console.log(error);
      alert("Failed to create post");
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-layout">
        <div className="feed-section">
          <div className="stories-bar premium-box">
            {demoStories.map((story, index) => (
              <div className="story-item" key={index}>
                <img src={story.pic} alt={story.name} />
                <span>{story.name}</span>
              </div>
            ))}
          </div>

          <div className="create-post premium-box">
            <h3>Create Post</h3>

            <textarea
              rows="4"
              placeholder="Share something with your followers..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <input
              type="text"
              placeholder="Paste image URL (optional)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="post-image-input"
            />

            <button className="auth-btn" onClick={handleCreatePost}>
              Post
            </button>
          </div>

          <h2 className="feed-title">Latest Feed</h2>

          {posts.length === 0 ? (
            <div className="empty-feed-box">
              <h3>No posts yet</h3>
              <p>Create your first post and start your feed 🚀</p>
            </div>
          ) : (
            posts.map((post) => (
              <PostCard key={post._id} post={post} refreshPosts={fetchPosts} />
            ))
          )}
        </div>

        <div className="suggested-users premium-box">
          <h3>Suggested Users</h3>
          {suggestedUsers.length === 0 ? (
            <p>No users to suggest yet.</p>
          ) : (
            suggestedUsers.map((user) => (
              <div className="suggested-user-card" key={user._id}>
                <img
                  src={
                    user.profilePic ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt={user.username}
                />
                <div>
                  <h4>{user.username}</h4>
                  <p>{user.bio || "New to SocialSphere"}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;