import React, { useState, createContext, useEffect } from "react";
import { auth } from "../database/firestoreConfig.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
// import { getUser } from "../../api/getUser.js";

export const AuthContext = createContext();
const provider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserDetails, setCurrentUserDetails] = useState({});
  const [fullDetails, setFullDetails] = useState({});
  const [step, setstep] = useState(1);
  let [admindata, setadmindata] = useState([]);

  function Signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const SignInWithGooglePopUp = async (res) => {
    try {
      const details = await signInWithPopup(auth, provider);
      setCurrentUser(details?.user?.email);
      setCurrentUserDetails({
        name: details?.user?.displayName,
        email: details?.user?.email,
        photo: details?.user?.photoURL,
      });
      setadmindata(currentUserDetails);
      res = true;
    } catch (error) {
      res = false;
      console.log(error.message);
    }
    return res;
  };
  async function SignOut() {
    return await signOut(auth);
  }
  function ForgotPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      return unsubscribe;
    }, []);
  });
  useEffect(() => {
    const fetch = async () => {
      if (currentUser) {
        setCurrentUserDetails({
          name: currentUser?.displayName,
          email: currentUser?.email,
          photo: currentUser?.photoURL,
        });
      }
    };
    fetch();
  }, [currentUser]);

  const value = {
    currentUser,
    currentUserDetails,
    setCurrentUserDetails,
    setCurrentUser,
    Signup,
    SignInWithGooglePopUp,
    login,
    SignOut,
    ForgotPassword,
    step,
    setstep,
    admindata,
    setadmindata,
    fullDetails,
    setFullDetails,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
