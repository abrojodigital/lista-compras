import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  // Firebase Config
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "lista-compras2-de087.firebaseapp.com",
  projectId: "lista-compras2-de087",
  storageBucket: "lista-compras2-de087.appspot.com",
  messagingSenderId: "883428003330",
  appId: "1:883428003330:web:6bd6ae6875b9b53620a11b"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)
const auth = getAuth(app);
export { firestore, auth }