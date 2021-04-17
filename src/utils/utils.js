import Moment from "moment";

Moment.locale("en"); // default the locale to English
var localeData = Moment.localeData();

export const FORMATS = {
  shortDate: "DD/MM/YYYY",
  datetime: "DD/MM/YYYY HH:mm",
  time: "HH:mm",
  serverFormat: "YYYY-MM-DDTHH:mm:ssZ",
  countdown: "DD  :  HH  :  mm  :  ss",
};

export const dateTimeConverter = (dateTime) => {
  let _moment = Moment(dateTime, FORMATS["datetime"]);
  let datetimeFormat = _moment.format(FORMATS["datetime"]);
  return datetimeFormat;
};

export const getObjFromDatetimeStr = (dateTime) => {
  return Moment(dateTime, FORMATS["datetime"]);
};

export const getDatetimeStrFromObj = (moment) => {
  return moment.format(FORMATS["datetime"]);
};

export const getObjFromIsoStr = (isoStr) => {
  return Moment(isoStr, FORMATS["serverFormat"]);
};

export const getIsoStrFromObj = (moment) => {
  return moment.format(FORMATS["serverFormat"]);
};

export const createObj = (fromObj) => {
  if (fromObj) {
    return Moment(fromObj);
  }
  return Moment();
};

export const getNowServerFormat = () => {
  return Moment().format(FORMATS["serverFormat"]);
};

/**
 * convert "server" format string into -> date string in "datetime" format.
 * @param {*} dateTime : date string in server format
 */
export const convertServerDate = (dateTime) => {
  let serverFormat = Moment(dateTime, FORMATS["serverFormat"]);
  let datetimeFormat = serverFormat.format(FORMATS["datetime"]);
  return datetimeFormat;
};

export const convertServerToShortDate = (dateTime) => {
  let serverFormat = Moment(dateTime, FORMATS["serverFormat"]);
  let dateOnly = serverFormat.format(FORMATS["shortDate"]);
  let timeOnly = serverFormat.format(FORMATS["time"]);
  return dateOnly;
};

/**
 * convert "datetime" format string into -> date string in server format.
 * @param {*} dateTime
 */
export const dateServerConverter = (dateTime) => {
  let datetimeFormat = Moment(dateTime, FORMATS["datetime"]);
  let serverFormat = datetimeFormat.format(FORMATS["serverFormat"]);
  return serverFormat;
};

export const isEmptyString = (string) => {
  if (string === "") return true;
  else return false;
};

export const isValidEmail = (email) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) return true;
  return false;
};

export const validateEmail = (email) => {
  let error = null;
  let regEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!email) {
    error = "Email is required";
  } else{
    let regRes = regEmail.test(email);
    if (!regRes){
      error = "Invalid email address.";
    }
  }
  return error;
};

export const validatePassword = (values) => {
  let error = null;
  const passwordRegex = /(?=.*[0-9])/;
  if (!values) {
    error = "password is required";
  } else if (values.length < 6) {
    error = "Password must be 6 characters long.";
  } else if (!passwordRegex.test(values)) {
    error = "Invalid password. Must contain at least 6 digits.";
  }
  return error;
};

export const validateLoginData = (data) => {
  let errors = {};
  let emailError = validateEmail(data.email);
  let passError = validatePassword(data.password);
  if (emailError) errors.email = emailError;
  if (passError) errors.password = passError;

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
    errorMsg: Object.values(errors).join("\n"),
  };
};
