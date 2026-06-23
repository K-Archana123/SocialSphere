import { useState } from "react";
import API from "../api";

const defaultPic =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const PostCard = ({ post, refreshPosts }) => {
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);

  const currentUser = JSON.parse(localStorage.getItem("user")) || {};

  const isMyPost =
    post.user?._id === currentUser?.id || post.user?.id === currentUser?.id;

  const handleLike = async () => {
    try {
      await API.put(`/posts/like/${post._id}`);
      refreshPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) return;
    try {
      await API.post(`/posts/comment/${post._id}`, { text: comment });
      setComment("");
      refreshPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/posts/${post._id}`);
      alert("Post deleted successfully");
      refreshPosts();
    } catch (error) {
      console.log(error);
      alert("Failed to delete post");
    }
  };

  const handleEditSave = async () => {
    if (!editedContent.trim()) return;

    try {
      await API.put(`/posts/${post._id}`, { content: editedContent });
      setIsEditing(false);
      alert("Post updated successfully");
      refreshPosts();
    } catch (error) {
      console.log(error);
      alert("Failed to update post");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Just now";
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <img
          src={post.user?.profilePic || defaultPic}
          alt="user"
          className="post-avatar"
          onError={(e) => (e.target.src = defaultPic)}
        />

        <div style={{ flex: 1 }}>
          <h4 style={{ margin: 0 }}>{post.user?.username || "User"}</h4>
          <small style={{ color: "#666" }}>{formatDate(post.createdAt)}</small>
        </div>

        {isMyPost && (
          <div style={{ display: "flex", gap: "8px" }}>
            <button className="small-post-btn" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "Cancel" : "Edit"}
            </button>
            <button className="small-delete-btn" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div style={{ marginTop: "12px" }}>
          <textarea
            rows="3"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="edit-post-textarea"
          />
          <button className="auth-btn" onClick={handleEditSave} style={{ marginTop: "10px" }}>
            Save Changes
          </button>
        </div>
      ) : (
        <p style={{ marginTop: "16px", fontSize: "15px", lineHeight: "1.6" }}>
          {post.content}
        </p>
      )}

      <div className="post-actions">
        <button onClick={handleLike}>❤️ {post.likes?.length || 0} Likes</button>
      </div>

      <div className="comment-box">
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleComment}>Comment</button>
      </div>

      {post.comments?.length > 0 && (
        <div className="comments-section">
          <h4>Comments</h4>
          {post.comments.map((c, i) => (
            <p key={i}>
              <strong>{c.user?.username || "User"}:</strong> {c.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;