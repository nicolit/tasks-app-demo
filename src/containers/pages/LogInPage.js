import React from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import EmailPasswordForm from "../../components/EmailPasswordForm";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import {validateLoginData } from "../../utils/utils";

const LogInPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [validError, setValidError] = React.useState("");


  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    let res = validateLoginData({email, password});
    if (res.valid){
      signInWithEmailAndPassword(email, password);
    } else {
      setValidError(res.errorMsg);
    }
  }

  if (user) {
    return (
      <div>
        <p>Registered User: {user.email}</p>
      </div>
    );
  }

  if (validError || error) {
    return(
      <div className="sign-up-error-container">
      <div className="sign-up-error"><p>Error: {validError ? validError : error.message}</p></div>
      
    </div>
    );
  }

  return (
    <div className="sign-up-screen">
    {loading && <p>Loading...</p>}
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