import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../index.css";

const EmailPasswordForm = ({handleSubmit,
    email,
    handleEmail,
    password,
    handlePassword,
    buttonText, error}) => {


  return (
    <form onSubmit={handleSubmit} className={"form"}>
      <TextField
        label="Email"
        name="email"
        type="text"
        value={email}
        onChange={handleEmail}
        className={'input'}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={handlePassword}
        className={"form-input"}
        required
      />
      {error && <span>{error}</span>}
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        classes={{root: "form-submit-button", label: "form-submit-button-label"}}
        style={{marginTop: 20, marginBottom: 20}}
      >
          {buttonText}
      </Button>
    </form>
  );
};

export default EmailPasswordForm;