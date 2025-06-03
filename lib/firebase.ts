// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBQ255kzjhaeC2S7hlcj8Tb72yV-ybdyRM",
  authDomain: "linkora-48d67.firebaseapp.com",
  projectId: "linkora-48d67",
  storageBucket: "linkora-48d67.firebasestorage.app",
  messagingSenderId: "34841223271",
  appId: "1:34841223271:web:77e5db106ca176336834c2",
  measurementId: "G-RT7FLNN8R1"
}

// Only initialize once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)

export { auth }
