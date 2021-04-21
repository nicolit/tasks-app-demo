import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export const fireBaseConfigs = {
  apiKey: config.API_KEY,
  authDomain: config.DOMAIN,
  databaseURL: config.DB_URL,
  projectId: config.PROJECT_ID,
  storageBucket: config.STORAGE_BUCKET,
  messagingSenderId: config.SENDER_ID,
  appId: config.APP_ID
};

firebase.initializeApp(fireBaseConfigs);

export const auth = firebase.auth();
export const database = firebase.database();

export default firebase;
