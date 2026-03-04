import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAHGgvbq55eIOU7I7hqZSxJ6YY1lYzHTXM",
  authDomain: "yujingai-guestbook.firebaseapp.com",
  projectId: "yujingai-guestbook",
  storageBucket: "yujingai-guestbook.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db, collection, addDoc, query, orderBy, onSnapshot, Timestamp };
