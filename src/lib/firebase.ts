
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey) {
  console.error(
    "[Firebase Setup Check] ERROR: NEXT_PUBLIC_FIREBASE_API_KEY is missing or empty. " +
    "Please verify this variable is correctly set in your .env.local file using the SDK config you have. " +
    "The app will likely fail to connect to Firebase. " +
    "Remember to restart your development server after creating or modifying .env.local."
  );
} else {
  console.log(
    "[Firebase Setup Check] NEXT_PUBLIC_FIREBASE_API_KEY is present. Project ID:", firebaseConfig.projectId
  );
}

let app: FirebaseApp;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
  } catch (error) {
    console.error("Firebase initializeApp failed:", error);
    if (!app!) { 
        console.error("Critical Firebase initialization error. App could not be initialized.");
    }
  }
} else {
  app = getApps()[0];
}

const auth: Auth = getAuth(app!);
const db: Firestore = getFirestore(app!);

export { app, auth, db };
