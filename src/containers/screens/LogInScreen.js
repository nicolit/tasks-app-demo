import React from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import EmailPasswordForm from "../../components/EmailPasswordForm";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

const LogInScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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

  if (user) {
    return (
      <div>
        <p>Registered User: {user.email}</p>
      </div>
    );
  }

  if (error) {
    return(
      <div className="sign-up-error-container">
      <div className="sign-up-error"><p>Error: {error.message}</p></div>
      
    </div>
    );
  }

  return (
    <div className="sign-up-screen">
    {loading && <p>Loading...</p>}
      <EmailPasswordForm
        handleSubmit={() => signInWithEmailAndPassword(email, password)}
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

export default LogInScreen;