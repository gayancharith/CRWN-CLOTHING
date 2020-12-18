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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log(`error creating user ${error.message}`);
    }
  }
  return userRef;
};
export default firebase;
