import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDks7xDzOpY97Ip2cjXfZ8Fol8f8FOY_CA",
  authDomain: "edutack-bfff8.firebaseapp.com",
  projectId: "edutack-bfff8",
  storageBucket: "edutack-bfff8.firebasestorage.app",
  messagingSenderId: "72014262478",
  appId: "1:72014262478:android:3c3afeba9527c50ca3a09f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
