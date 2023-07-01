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
  const [step, setstep] = useState(1);

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
      console.log(user);
      setCurrentUser(user);
      return unsubscribe;
    }, []);
  });
  useEffect(() => {
    const fetch = async () => {
      if (currentUser) {
        console.log(currentUser);
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
    setCurrentUser,
    Signup,
    SignInWithGooglePopUp,
    login,
    SignOut,
    ForgotPassword,
    step,
    setstep,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
