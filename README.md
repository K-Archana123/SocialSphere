# SocialSphere 🌐

SocialSphere is a **full-stack social media web application** built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It allows users to create accounts, log in securely, share posts, interact with other users, and manage their profiles through a clean and responsive interface.

---

## 🚀 Features

* **User Authentication**

  * Register a new account
  * Login with secure JWT authentication
  * Logout functionality

* **Profile Management**

  * View personal profile
  * Update bio and profile picture
  * See user posts and profile details

* **Posts**

  * Create text-based posts
  * View latest feed posts
  * Like and unlike posts
  * Comment on posts

* **Users**

  * View all registered users
  * Search users by username
  * Follow / unfollow users

* **Dashboard**

  * Stories section
  * Create post section
  * Suggested users panel
  * Feed displaying latest posts

* **Responsive UI**

  * Modern clean interface
  * Mobile-friendly and desktop-friendly design

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs

---

## 📂 Project Structure

```bash
SocialSphere/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── seed.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/K-Archana123/SocialSphere.git
cd SocialSphere
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder and add:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Start backend server:

```bash
npm run dev
```

---

### 3. Setup Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

---

## 🌱 Seed Demo Data

To insert demo users and posts into MongoDB:

```bash
cd backend
npm run seed
```

This will create sample users and posts for testing the application.

---

## 📸 Screens / Pages Included

* Landing Page
* Login Page
* Register Page
* Dashboard / Feed
* Users Page
* Profile Page

---

## 🔐 API Functionalities

### Auth

* Register user
* Login user

### Users

* Get all users
* Get own profile
* Update profile
* Follow / unfollow user

### Posts

* Create post
* Get feed posts
* Like / unlike post
* Add comment to post

---

## 💡 Future Improvements

* Image and video post uploads
* Story uploads
* Real-time notifications
* Chat / messaging system
* Better feed recommendation logic
* User profile viewing for other accounts

---

## 👩‍💻 Author

**Archana Kandela**

* GitHub: [K-Archana123](https://github.com/K-Archana123)

---

## 📌 Internship Project

This project was developed as part of a **Web Development Internship Task**, focusing on building a social media platform using the MERN stack with authentication, post management, and user interaction features.

---

## ⭐ If you like this project

If you found this project useful, consider giving it a **star** on GitHub ⭐
