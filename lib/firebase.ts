import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBftQzF3uTM_nQIF-JLXsjX4RDor0OqCDQ",
  authDomain: "linkorafrontend.firebaseapp.com",
  projectId: "linkorafrontend",
  storageBucket: "linkorafrontend.firebasestorage.app",
  messagingSenderId: "759009225161",
  appId: "1:759009225161:web:450920d17a1843d7766018",
  measurementId: "G-JGWFPNRKZL",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
