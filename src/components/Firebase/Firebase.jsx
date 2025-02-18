import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAc9xHJ9Xo4EWfs81oPvk0tAxUYMaBNsvs",
  authDomain: "airesume-fc9f4.firebaseapp.com",
  projectId: "airesume-fc9f4",
  storageBucket: "airesume-fc9f4.appspot.com",
  messagingSenderId: "24515080715",
  appId: "1:24515080715:web:7fb681689c299e9cba8d0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
