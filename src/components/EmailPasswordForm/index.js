import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styles from "./email-password-form.module.css";

const EmailPasswordForm = ({handleSubmit,
    email,
    handleEmail,
    password,
    handlePassword,
    buttonText, error}) => {


  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <TextField
        label="Email"
        name="email"
        type="text"
        value={email}
        onChange={handleEmail}
        className={'input'}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={handlePassword}
        className={'input'}
      />
      {error && <span>{error}</span>}
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        className={'button'}
      >
          {buttonText}
      </Button>
    </form>
  );
};

export default EmailPasswordForm;