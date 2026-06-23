import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";

const defaultPic =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user")) || {};

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");

      const filtered = res.data.filter(
        (user) => user._id !== currentUser.id && user._id !== currentUser._id
      );

      setUsers(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleFollow = async (id) => {
    try {
      const res = await API.put(`/users/follow/${id}`);

      let updatedFollowing = currentUser.following || [];
      const isFollowing = updatedFollowing.includes(id);

      if (isFollowing) {
        updatedFollowing = updatedFollowing.filter((uid) => uid !== id);
      } else {
        updatedFollowing = [...updatedFollowing, id];
      }

      const updatedUser = { ...currentUser, following: updatedFollowing };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      fetchUsers();
      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert("Failed to follow/unfollow");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="users-page">
        <div className="users-header">
          <h2>Discover People</h2>
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-box"
          />
        </div>

        <div className="users-grid">
          {filteredUsers.length === 0 ? (
            <p>No users found.</p>
          ) : (
            filteredUsers.map((user) => {
              const isFollowing =
                currentUser.following?.includes(user._id) || false;

              return (
                <div className="user-card" key={user._id}>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/user/${user._id}`)}
                  >
                    <img
                      src={user.profilePic || defaultPic}
                      alt={user.username}
                      className="user-card-pic"
                      onError={(e) => (e.target.src = defaultPic)}
                    />
                    <h3>{user.username}</h3>
                    <p>{user.bio || "No bio available"}</p>
                    <p>
                      <strong>{user.followers?.length || 0}</strong> followers
                    </p>
                  </div>

                  <button
                    className="follow-btn"
                    onClick={() => handleFollow(user._id)}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Users;