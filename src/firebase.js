import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

export const config = {
  apiKey: " AIzaSyBWzPIzGDEp146gE-qTajnxehQ-58P2fwQ",
  authDomain: "kanban-board-875ad.web.app ",
  databaseURL: "https://kanban-board-875ad-default-rtdb.firebaseio.com/",
  projectId: "kanban-board-875ad",
  storageBucket: "kanban-board-875ad-default-rtdb",
  messagingSenderId: "159360026374",
  appId: "1:159360026374:web:df2db1f4f4f268d2040087",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const database = firebase.database();

export default firebase;
