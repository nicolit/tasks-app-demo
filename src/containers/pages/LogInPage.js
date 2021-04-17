import React from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import EmailPasswordForm from "../../components/EmailPasswordForm";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { validateLoginData } from "../../utils/utils";

const LogInPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const history = useHistory();


  const handleEmail = (value) => {
    setEmail(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        history.push("/");
        console.log(res);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  if (error) {
    return (
      <div className="sign-up-error-container">
        <div className="sign-up-error">
          <p>Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sign-up-screen">
      <EmailPasswordForm
        handleSubmit={handleLogin}
        email={email}
        handleEmail={handleEmail}
        password={password}
        handlePassword={handlePassword}
        buttonText="Log In"
        error={error}
      />
    </div>
  );
};

export default LogInPage;
