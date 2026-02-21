import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: (process.env.REACT_APP_FIREBASE_API_KEY || '').trim(),
  authDomain: (process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '').trim(),
  projectId: (process.env.REACT_APP_FIREBASE_PROJECT_ID || '').trim(),
  storageBucket: (process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '').trim(),
  messagingSenderId: (process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '').trim(),
  appId: (process.env.REACT_APP_FIREBASE_APP_ID || '').trim(),
};

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;

export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.apiKey !== 'your_firebase_api_key_here');
}

function getApp(): FirebaseApp {
  if (!_app) {
    _app = initializeApp(firebaseConfig);
  }
  return _app;
}

export function getFirebaseAuth(): Auth {
  if (!_auth) {
    _auth = getAuth(getApp());
  }
  return _auth;
}

export const googleProvider = new GoogleAuthProvider();
export const microsoftProvider = new OAuthProvider('microsoft.com');
