import { type Firestore, getFirestore } from 'firebase/firestore';

import { getFirebaseApp } from './client';

export function getFirebaseFirestore(): Firestore {
  return getFirestore(getFirebaseApp());
}
