import React from "react";
import Card from "./components/card";
import Navbar from "./components/navbar";
import { posts } from './data';
import { io } from "socket.io-client"
function App() {
  const [username, setUsername] = React.useState("");
  const [user, setUser] = React.useState("");
  const [socket, setSocket] = React.useState(null);
  React.useEffect(() => {
    setSocket(io("http://localhost:5000"));
    // console.log(socket);
    // console.log(socket.on("firstEvent", (msg) => {
    //   console.log(msg)
    // }))
  }, [])

  React.useEffect(() => {
    socket?.emit("newUser", user)
  }, [socket, user])
  const handleLogin = () => {
    setUser(username);
  };
  
  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket}/>
          {posts.map((post) => (
            <Card key={post.id} post={post} user={user} socket={socket}/>
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
