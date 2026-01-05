// अपना Firebase config यहाँ डालें
// यह वही config है जो आपने Firebase से कॉपी किया था

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// 🔴🔴🔴 यहाँ अपना Firebase Config डालें 🔴🔴🔴
const firebaseConfig = {
  apiKey: "AIzaSyCUAkwAZbcurxmkVn4M3YvyNTT0g7a53CU",
  authDomain: "shine-your-home-e91c2.firebaseapp.com",
  projectId: "shine-your-home-e91c2",
  storageBucket: "shine-your-home-e91c2.firebasestorage.app",
  messagingSenderId: "216367505790",
  appId: "1:216367505790:web:0af6a1a7c5cb7e37fe132f"
};

// Firebase ऐप इनिशियलाइज़ करें
const app = initializeApp(firebaseConfig);

// Firebase सेवाएँ
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
