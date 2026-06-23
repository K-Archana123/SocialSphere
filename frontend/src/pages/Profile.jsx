import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api";

const defaultPic =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const Profile = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [user, setUser] = useState({
    username: storedUser.username || "User",
    email: storedUser.email || "",
    bio: storedUser.bio || "Hey there! I am using SocialSphere.",
    profilePic: storedUser.profilePic || defaultPic,
    followers: storedUser.followers || [],
    following: storedUser.following || [],
    id: storedUser.id || storedUser._id,
    _id: storedUser._id || storedUser.id,
  });

  const [bio, setBio] = useState(
    storedUser.bio || "Hey there! I am using SocialSphere."
  );
  const [profilePic, setProfilePic] = useState(
    storedUser.profilePic || defaultPic
  );
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/me");
        const backendUser = res.data;

        const mergedUser = {
          ...backendUser,
          id: backendUser._id || backendUser.id,
          _id: backendUser._id || backendUser.id,
          bio: backendUser.bio || "Hey there! I am using SocialSphere.",
          profilePic: backendUser.profilePic || defaultPic,
          followers: backendUser.followers || [],
          following: backendUser.following || [],
        };

        setUser(mergedUser);
        setBio(mergedUser.bio);
        setProfilePic(mergedUser.profilePic);
        localStorage.setItem("user", JSON.stringify(mergedUser));
      } catch (error) {
        console.log("Using local profile data");
      }
    };

    const fetchMyPosts = async () => {
      try {
        const res = await API.get("/posts");
        const currentUser = JSON.parse(localStorage.getItem("user")) || {};
        const currentId = currentUser.id || currentUser._id;

        const filteredPosts = res.data.filter(
          (post) =>
            post.user?._id === currentId || post.user?.id === currentId
        );

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
    fetchMyPosts();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const res = await API.put("/users/me", { bio, profilePic });

      const updatedUser = {
        ...user,
        ...res.data,
        bio,
        profilePic,
        id: res.data._id || res.data.id || user.id,
        _id: res.data._id || res.data.id || user._id,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Profile updated successfully!");
    } catch (error) {
      const updatedUser = { ...user, bio, profilePic };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Profile updated locally.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-page">
        <div className="profile-container premium-box">
          <div className="profile-top">
            <img
              src={profilePic || defaultPic}
              alt="Profile"
              onError={(e) => (e.target.src = defaultPic)}
            />

            <div className="profile-info">
              <h2>{user.username}</h2>
              <p>{user.email}</p>

              <div className="profile-stats">
                <span><strong>{myPosts.length}</strong> Posts</span>
                <span><strong>{user.followers?.length || 0}</strong> Followers</span>
                <span><strong>{user.following?.length || 0}</strong> Following</span>
              </div>

              <p className="profile-bio">{user.bio}</p>
            </div>
          </div>

          <div className="profile-edit-box">
            <h3>Edit Profile</h3>

            <label>Profile Picture URL</label>
            <input
              type="text"
              placeholder="Paste image URL"
              value={profilePic}
              onChange={(e) => setProfilePic(e.target.value)}
            />

            <label>Bio</label>
            <textarea
              rows="4"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

            <button className="auth-btn" onClick={handleUpdateProfile}>
              Save Profile
            </button>
          </div>
        </div>

        <div className="profile-posts premium-box">
          <h3>My Posts</h3>
          {myPosts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            <div className="profile-posts-grid">
              {myPosts.map((post) => (
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

export default Profile;