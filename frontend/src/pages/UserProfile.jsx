import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";

const defaultPic =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const UserProfile = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("user")) || {};

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setNotFound(false);

      const res = await API.get(`/users/${id}`);

      setUser(res.data.user || null);
      setPosts(res.data.posts || []);
    } catch (error) {
      console.log("Fetch user profile error:", error);
      setNotFound(true);
      setUser(null);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserProfile();
    }
  }, [id]);

  const handleFollow = async () => {
    try {
      const res = await API.put(`/users/follow/${id}`);

      const updatedCurrentUser = {
        ...currentUser,
        following: res.data.following || currentUser.following || [],
      };

      localStorage.setItem("user", JSON.stringify(updatedCurrentUser));

      // update profile follower count immediately
      setUser((prev) => {
        if (!prev) return prev;

        const amIFollowing = updatedCurrentUser.following?.includes(prev._id);

        return {
          ...prev,
          followers: amIFollowing
            ? [...(prev.followers || []), currentUser.id]
            : (prev.followers || []).filter(
                (followerId) => followerId.toString() !== currentUser.id?.toString()
              ),
        };
      });

      alert(res.data.message);
    } catch (error) {
      console.log("Follow/unfollow error:", error);
      alert("Failed to follow/unfollow");
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="profile-page">
          <div className="profile-container premium-box">
            <p>Loading profile...</p>
          </div>
        </div>
      </>
    );
  }

  if (notFound || !user) {
    return (
      <>
        <Navbar />
        <div className="profile-page">
          <div className="profile-container premium-box">
            <h2>User not found</h2>
            <p>This profile does not exist or could not be loaded.</p>
          </div>
        </div>
      </>
    );
  }

  const isFollowing =
    currentUser.following?.some(
      (followId) => followId.toString() === user._id.toString()
    ) || false;

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

              <p className="profile-bio">{user.bio || "No bio yet"}</p>

              {currentUser.id !== user._id && (
                <button className="follow-btn" onClick={handleFollow}>
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
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
                  <br />
                  <small>💬 {post.comments?.length || 0} Comments</small>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;