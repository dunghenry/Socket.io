import React from "react";
import Card from "./components/card";
import Navbar from "./components/navbar";
import { posts } from './data';
import { io } from "socket.io-client"
function App() {
  const [username, setUsername] = React.useState("");
  const [user, setUser] = React.useState("");
  React.useEffect(() => {
    const socket = io("http://localhost:5000")
  }, [])
  const handleLogin = () => {
    setUser(username);
  };
  
  return (
    <div className="container">
      {user ? (
        <>
          <Navbar />
          {posts.map((post) => (
            <Card key={post.id} post={post} user={user}/>
          ))}
          <span className="username">{username}</span>
        </>
      ) : (
        <div className="login">
          <input
            type="text"
            value={username}
            placeholder="Enter username..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
