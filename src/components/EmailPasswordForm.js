import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../index.css";
import { validateEmail, validatePassword } from "../utils/utils";

const EmailPasswordForm = ({
  handleSubmit,
  email,
  handleEmail,
  password,
  handlePassword,
  buttonText,
  error,
}) => {
  const [emailError, setEmailError] = React.useState("");
  const [passError, setPassError] = React.useState("");

  const onChangeEmail = (event) => {
    let text = event.target.value;
    handleEmail(text);
    if (text !== ""){
      let emailErrorMsg = validateEmail(text);
      if (emailErrorMsg) {
        setEmailError(emailErrorMsg);
      } else {
        setEmailError("");
      }
    }
  };

  const onChangePassword = (event) => {
    let text = event.target.value;
    handlePassword(text);
    if (text !== ""){
      let passErrorMsg = validatePassword(text);
      if (passErrorMsg) {
        setPassError(passErrorMsg);
      } else {
        setPassError("");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={"form"}>
      <TextField
        label="Email"
        name="email"
        type="text"
        value={email}
        onChange={onChangeEmail}
        className={"input"}
        required
      />
      {email && emailError && <span>{emailError}</span>}
      <TextField
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={onChangePassword}
        className={"form-input"}
        required
      />
      {password && passError && <span>{passError}</span>}
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        classes={{
          root: "form-submit-button",
          label: "form-submit-button-label",
        }}
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default EmailPasswordForm;
