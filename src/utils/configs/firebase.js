import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const apiKey = import.meta.env.VITE_API_KEY ?? "";
const authDomain = import.meta.env.VITE_AUTH_DOMAIN ?? "";
const projectId = import.meta.env.VITE_PROJECT_ID ?? "";
const storageBucket = import.meta.env.VITE_STORAGE_UCKET ?? "";
const messagingSenderId = import.meta.env.VITE_MESSAGE_SENDER_ID ?? "";
const appId = import.meta.env.VITE_AOO_ID ?? "";
const measurementId = import.meta.env.VITE_MEASUREMENT_ID ?? "";

const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth(app);
export { auth, firebase };

export const db = getFirestore(app);
export const imgdb = getStorage(app);
