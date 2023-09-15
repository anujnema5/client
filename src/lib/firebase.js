// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBxyyCHEvBBFKctwckez-M1eL7LFrDatck",
  authDomain: "clone-b2b0e.firebaseapp.com",
  projectId: "clone-b2b0e",
  storageBucket: "clone-b2b0e.appspot.com",
  messagingSenderId: "526365590080",
  appId: "1:526365590080:web:e2445e0e824cfca09fd5a5",
  measurementId: "G-H40EN0W08X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app;