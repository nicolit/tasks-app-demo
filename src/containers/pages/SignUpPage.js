import React from "react";
import { auth } from "../../firebase";
import EmailPasswordForm from "../../components/EmailPasswordForm";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { validateLoginData } from "../../utils/utils";
import { useHistory } from "react-router-dom";

const SignUpPage = () => {
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

  const handleSignup = (e) => {
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
        handleSubmit={handleSignup}
        email={email}
        handleEmail={handleEmail}
        password={password}
        handlePassword={handlePassword}
        buttonText="Sign Up"
        error={error}
      />
    </div>
  );
};

export default SignUpPage;
