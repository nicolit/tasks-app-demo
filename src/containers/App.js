import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "../components/Header";
import Board from "../components/Board";
import { auth, database } from "../firebase";
import Nav from "../components/Nav/index";
import LogInScreen from "./screens/LogInScreen";
import SignUpScreen from "./screens/SignUpScreen";

function App() {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoading(false);
      if (user) {
        console.log(user.uid);
        setUser(user);
      }
    });
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => setUser(null));
  };

  if (loading)
    return (
      <div>
        <span>Loading...</span>
      </div>
    );

  const renderBoards = () => {
    return (
      <div className="kanban-container">
        <Board title={"R&D"} user={user} />
        <Board title={"Sales"} user={user} />
      </div>
    );
  };

  return (
    <Router>
      <div>
        <Header></Header>
        <Nav user={user} handleLogout={handleLogout} />
        <Switch>
          <Route path="/sign-up">
            <SignUpScreen />
          </Route>
          <Route path="/log-in">
            <LogInScreen />
          </Route>
          <Route path="/">{user ? renderBoards() : <div></div>}</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
