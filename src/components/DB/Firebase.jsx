import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCnyL2yPorvJJVmTBm9N9UH_EVPkoYVg8Q",
  authDomain: "gomovies-6d0c2.firebaseapp.com",
  projectId: "gomovies-6d0c2",
  storageBucket: "gomovies-6d0c2.appspot.com",
  messagingSenderId: "250382080634",
  appId: "1:250382080634:web:757d55ecdcf4ab993f79c3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };

