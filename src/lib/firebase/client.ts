import { type FirebaseApp, type FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';

const REQUIRED_FIREBASE_ENV_KEYS = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
] as const;

type FirebaseEnvKey = (typeof REQUIRED_FIREBASE_ENV_KEYS)[number];

const FIREBASE_ENV = {
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
} satisfies Record<FirebaseEnvKey, string | undefined>;

function getRequiredEnvValue(key: FirebaseEnvKey): string {
  const value = FIREBASE_ENV[key];

  if (!value) {
    throw new Error(
      `Missing required Firebase env var: ${key}. Copy .env.example to .env.local and fill in the Firebase web app config values.`,
    );
  }

  return value;
}

export function getFirebaseWebConfig(): FirebaseOptions {
  return {
    apiKey: getRequiredEnvValue('NEXT_PUBLIC_FIREBASE_API_KEY'),
    authDomain: getRequiredEnvValue('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'),
    projectId: getRequiredEnvValue('NEXT_PUBLIC_FIREBASE_PROJECT_ID'),
    storageBucket: getRequiredEnvValue('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getRequiredEnvValue('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
    appId: getRequiredEnvValue('NEXT_PUBLIC_FIREBASE_APP_ID'),
  };
}

export function getFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp(getFirebaseWebConfig());
}

export { REQUIRED_FIREBASE_ENV_KEYS };
