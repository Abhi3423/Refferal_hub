import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIRESTORE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIRESTORE_AUTHDOMAIN,
  projectId: "referal-hub",
  storageBucket: "referal-hub.appspot.com",
  messagingSenderId: "1036882358358",
  appId: "1:1036882358358:web:de9498228fc15c3c338bf7",
  measurementId: "G-K7QCFLRME7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);
