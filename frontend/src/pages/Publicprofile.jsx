import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";

const defaultPic =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const PublicProfile = () => {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchUserProfile();
    }
  }, [id]);

  const fetchUserProfile = async () => {
    try {
      console.log("Opening profile for user id:", id);

      // 1) Get clicked user's profile
      const userRes = await API.get(`/users/${id}`);
      console.log("User profile response:", userRes.data);

      setUser(userRes.data);

      // 2) Get all posts and filter clicked user's posts
      const postsRes = await API.get("/posts");
      console.log("All posts:", postsRes.data);

      const filteredPosts = postsRes.data.filter(
        (post) =>
          post.user?._id === id ||
          post.user?.id === id ||
          post.user === id
      );

      setPosts(filteredPosts);
    } catch (error) {
      console.log("Public profile error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="profile-page">
          <div className="profile-container premium-box">
            <h2>Loading profile...</h2>
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="profile-page">
          <div className="profile-container premium-box">
            <h2>User not found</h2>
            <p>Could not load this profile.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-container premium-box">
          <div className="profile-top">
            <img
              src={user.profilePic || defaultPic}
              alt={user.username}
              onError={(e) => (e.target.src = defaultPic)}
            />

            <div className="profile-info">
              <h2>{user.username}</h2>
              <p>{user.email}</p>

              <div className="profile-stats">
                <span><strong>{posts.length}</strong> Posts</span>
                <span><strong>{user.followers?.length || 0}</strong> Followers</span>
                <span><strong>{user.following?.length || 0}</strong> Following</span>
              </div>

              <p className="profile-bio">
                {user.bio || "No bio available"}
              </p>
            </div>
          </div>
        </div>

        <div className="profile-posts premium-box">
          <h3>{user.username}'s Posts</h3>

          {posts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            <div className="profile-posts-grid">
              {posts.map((post) => (
                <div className="profile-post-card" key={post._id}>
                  <p>{post.content}</p>
                  <small>❤️ {post.likes?.length || 0} Likes</small>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PublicProfile;