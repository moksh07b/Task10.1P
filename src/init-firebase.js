import {doc, getDoc, getFirestore, setDoc} from "firebase/firestore"
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getStorage} from "firebase/storage"
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHZuhiqK7VQJjNPjq7KTfjgRs8fGQFRmg",
  authDomain: "task8-1d-de879.firebaseapp.com",
  projectId: "task8-1d-de879",
  storageBucket: "task8-1d-de879.appspot.com",
  messagingSenderId: "488827794496",
  appId: "1:488827794496:web:dee566a242a3cab3b69ba5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const imageDb = getStorage(app)

const provider = new GoogleAuthProvider(); 
  provider.setCustomParameters ({
  prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = async() => await signInWithPopup(auth, provider);


export const createUserDocFromAuth= async (userAuth, additionalInformation ={}) =>{
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if(!userSnapshot.exists()){
    const {displayName, email} = userAuth;
    const createdAt = new Date();
  
    try{
      await setDoc(userDocRef,{
        displayName,
        createdAt,
        email,
        ...additionalInformation
      })
    }
  catch(error){
    console.log(error.message)
  }
}
return userDocRef;
}



export const createAuthUserWithEmailAndPassword = async (email, password, displayName) =>{
  if (!email || !password) return;
  const userCredential =  await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(userCredential.user, {
    displayName: displayName
  });
}

export const signinAuthUserWithEmailAndPassword = async (email, password) =>{
  if (!email || !password) return;
 return await signInWithEmailAndPassword(auth, email, password)
}