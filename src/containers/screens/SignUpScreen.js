import React from "react";
import { auth } from "../../firebase";
import EmailPasswordForm from "../../components/EmailPasswordForm";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

const SignUpScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

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
        handleSubmit={() => createUserWithEmailAndPassword(email, password)}
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

export default SignUpScreen;
