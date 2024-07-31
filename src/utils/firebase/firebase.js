import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDiHtrZOBbUJUBPW5LeiixrbuROdyyrhUo",
  authDomain: "mapiol-ba282.firebaseapp.com",
  projectId: "mapiol-ba282",
  storageBucket: "mapiol-ba282.appspot.com",
  messagingSenderId: "236268435502",
  appId: "1:236268435502:web:4d9370e09beeff921d47bf",
  measurementId: "G-JZHJD57ZWX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
// firebase.js