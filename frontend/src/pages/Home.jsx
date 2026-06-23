import { useEffect, useState } from "react";
import API from "../api";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    if (!content.trim()) return;
    try {
      await API.post("/posts", { content });
      setContent("");
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <h2>Home Feed</h2>

        <div style={styles.createPost}>
          <textarea
            rows="4"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button onClick={handleCreatePost}>Post</button>
        </div>

        {posts.length === 0 ? (
          <p>No posts yet</p>
        ) : (
          posts.map((post) => (
            <PostCard key={post._id} post={post} refreshPosts={fetchPosts} />
          ))
        )}
      </div>
    </>
  );
};

const styles = {
  container: {
    width: "60%",
    margin: "20px auto",
  },
  createPost: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
};

export default Home;