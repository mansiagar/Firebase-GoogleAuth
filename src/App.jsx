import { useState } from "react";
import { signInWithGoogle, signOutUser } from "./firebaseAuth";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        setUser(user);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOutUser();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <div>
      <h1>Firebase Google Auth</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.displayName || "User"}!</h2>
          <img src={user.photoURL} alt="User Avatar" width={50} />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Google</button>
      )}
    </div>
  );
};

export default App;
