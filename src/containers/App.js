import React from "react";
import "./App.css";
import Header from "../components/Header/Header";
import Board from "../components/Board/Board";
import { auth } from './firebase';

function App() {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoading(false);
      if (user) {
        setUser(user);
      }
    });
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => setUser(null));
  };

  if (loading) return <div><span>Loading...</span></div>;

  return (
    <div>
      <Header></Header>
      <Board></Board>
    </div>
  );
}

export default App;
