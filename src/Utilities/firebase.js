import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  // Firebase Config
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "lista-compras-1ddc1.firebaseapp.com",
  projectId: "lista-compras-1ddc1",
  storageBucket: "lista-compras-1ddc1.appspot.com",
  messagingSenderId: "947049511622",
  appId: "1:947049511622:web:0dc00a6cb38e28e3fa35c7"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)
const auth = getAuth(app);
export { firestore, auth }