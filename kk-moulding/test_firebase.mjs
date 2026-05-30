import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBeu57WtKmi49MdEE2hc8QkPapFxHsOkrE",
  authDomain: "kkmouding.firebaseapp.com",
  projectId: "kkmouding",
  storageBucket: "kkmouding.firebasestorage.app",
  messagingSenderId: "833121757091",
  appId: "1:833121757091:web:6be854fdee3767bd95dc16",
  measurementId: "G-LS036HXXVN",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function test() {
  console.log('Testing Unauthenticated Access...');
  try {
    const snap = await getDocs(collection(db, 'enquiries'));
    console.log('Unauthenticated access SUCCESS!', snap.size, 'docs');
  } catch (err) {
    console.log('Unauthenticated access FAILED:', err.message);
  }

  console.log('\nTesting Anonymous Auth...');
  try {
    await signInAnonymously(auth);
    console.log('Anonymous sign in SUCCESS!');
    const snap = await getDocs(collection(db, 'enquiries'));
    console.log('Authenticated access SUCCESS!', snap.size, 'docs');
  } catch (err) {
    console.log('Anonymous Auth / Access FAILED:', err.message);
  }
  
  process.exit(0);
}

test();
