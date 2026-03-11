import { type Auth, getAuth } from 'firebase/auth';

import { getFirebaseApp } from './client';

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
}
