import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBeu57WtKmi49MdEE2hc8QkPapFxHsOkrE",
  authDomain: "kkmouding.firebaseapp.com",
  projectId: "kkmouding",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function test() {
  console.log('Attempting to create user...');
  try {
    const cred = await createUserWithEmailAndPassword(auth, 'backend@kkmoulding.com', 'kkmoulding123!');
    console.log('SUCCESS! User created:', cred.user.uid);
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      console.log('User already exists. Attempting sign in...');
      try {
        const cred = await signInWithEmailAndPassword(auth, 'backend@kkmoulding.com', 'kkmoulding123!');
        console.log('SUCCESS! Signed in:', cred.user.uid);
      } catch (err2) {
        console.log('Sign in FAILED:', err2.message);
      }
    } else {
      console.log('Create user FAILED:', err.message);
    }
  }
  process.exit(0);
}

test();
