import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvrw_iGno11J0Ogj_mvJnJMKrXkOhwVc0",
  authDomain: "crwn-clothing-db-76081.firebaseapp.com",
  projectId: "crwn-clothing-db-76081",
  storageBucket: "crwn-clothing-db-76081.appspot.com",
  messagingSenderId: "651974377103",
  appId: "1:651974377103:web:ac5e2443cec0b57904fafa",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const auth = getAuth();
export const signInWithGooglePopup = async () =>
  signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);

  // if user data does not exist
  // create / set the user data
  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      console.log("attempt to create user");
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }

  console.log("not creating user", userDocRef);
  return userDocRef;
};
