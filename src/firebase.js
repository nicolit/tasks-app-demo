import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export const fireBaseConfigs = {
  apiKey: config.API_KEY,
  authDomain: "kanban-board-875ad.web.app",
  databaseURL: "https://kanban-board-875ad-default-rtdb.firebaseio.com/",
  projectId: "kanban-board-875ad",
  storageBucket: "kanban-board-875ad-default-rtdb",
  messagingSenderId: config.SENDER_ID,
  appId: config.APP_ID
};

firebase.initializeApp(fireBaseConfigs);

export const auth = firebase.auth();
export const database = firebase.database();

export default firebase;
