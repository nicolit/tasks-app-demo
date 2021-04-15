import Moment from "moment";

Moment.locale("en"); // default the locale to English
var localeData = Moment.localeData();

export const FORMATS = {
    shortDate: "DD/MM/YYYY",
    datetime: "DD/MM/YYYY HH:mm",
    time: "HH:mm",
    serverFormat: "YYYY-MM-DDTHH:mm:ssZ",
    countdown: "DD  :  HH  :  mm  :  ss"
  };

  export const dateTimeConverter = dateTime => {
    let _moment = Moment(dateTime, FORMATS["datetime"]);
    let datetimeFormat = _moment.format(FORMATS["datetime"]);
    return datetimeFormat;
  };

  export const getObjFromDatetimeStr = dateTime => {
    return Moment(dateTime, FORMATS["datetime"]);
  };
  
  export const getDatetimeStrFromObj = moment => {
    return moment.format(FORMATS["datetime"]);
  };
  
  export const getObjFromIsoStr = isoStr => {
    return Moment(isoStr, FORMATS["serverFormat"]);
  };
  
  export const getIsoStrFromObj = moment => {
    return moment.format(FORMATS["serverFormat"]);
  };

  export const createObj = fromObj => {
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
export const convertServerDate = dateTime => {
    let serverFormat = Moment(dateTime, FORMATS["serverFormat"]);
    let datetimeFormat = serverFormat.format(FORMATS["datetime"]);
    return datetimeFormat;
  };
  
  export const convertServerToShortDate = dateTime => {
    let serverFormat = Moment(dateTime, FORMATS["serverFormat"]);
    let dateOnly = serverFormat.format(FORMATS["shortDate"]);
    let timeOnly = serverFormat.format(FORMATS["time"]);
    return dateOnly;
  };

  /**
 * convert "datetime" format string into -> date string in server format.
 * @param {*} dateTime
 */
export const dateServerConverter = dateTime => {
    let datetimeFormat = Moment(dateTime, FORMATS["datetime"]);
    let serverFormat = datetimeFormat.format(FORMATS["serverFormat"]);
    return serverFormat;
  };