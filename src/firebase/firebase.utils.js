import firebase from "firebase/app"; //pull firebase utility library
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDo10fEzaRWK-zb4jcHcVihH4TPJpFH5Hk",
  authDomain: "crwn-db-fe8a2.firebaseapp.com",
  projectId: "crwn-db-fe8a2",
  storageBucket: "crwn-db-fe8a2.appspot.com",
  messagingSenderId: "112816614633",
  appId: "1:112816614633:web:b0f46fe40a7fbc5b905478",
  measurementId: "G-TB3NMCZBX9",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
