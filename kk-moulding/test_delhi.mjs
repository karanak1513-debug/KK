import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "kk-moulding-delhi",
  appId: "1:549604222826:web:dca1b29a5e61f1883be713",
  storageBucket: "kk-moulding-delhi.firebasestorage.app",
  apiKey: "AIzaSyCaW4wbZb3pqb8PJfXvxXCzO_lIPEPvWMw",
  authDomain: "kk-moulding-delhi.firebaseapp.com",
  messagingSenderId: "549604222826",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  console.log('Testing kk-moulding-delhi Access...');
  try {
    const snap = await getDocs(collection(db, 'settings'));
    console.log('Access SUCCESS!', snap.size, 'docs');
    snap.forEach(doc => console.log(doc.id, '=>', doc.data()));
  } catch (err) {
    console.log('Access FAILED:', err.message);
  }
  process.exit(0);
}

test();
