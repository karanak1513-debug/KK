import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBeu57WtKmi49MdEE2hc8QkPapFxHsOkrE",
  authDomain: "kkmouding.firebaseapp.com",
  projectId: "kkmouding",
  storageBucket: "kkmouding.firebasestorage.app",
  messagingSenderId: "833121757091",
  appId: "1:833121757091:web:6be854fdee3767bd95dc16"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function test() {
  console.log('Testing Firestore read on kkmouding...');
  try {
    const snap = await getDocs(collection(db, 'settings'));
    console.log('SUCCESS! Read', snap.docs.length, 'settings documents.');
  } catch (err) {
    console.error('FAILED to read Firestore:', err.message);
  }
  process.exit(0);
}

test();
