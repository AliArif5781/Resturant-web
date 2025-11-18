import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, doc, getDoc, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Collection reference
export const dishesCollection = collection(db, "dishes");

// Helper functions
export async function getAllDishes() {
  const snapshot = await getDocs(dishesCollection);
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      // Ensure createdAt is a number (convert Firestore Timestamp if needed)
      createdAt: data.createdAt instanceof Timestamp 
        ? data.createdAt.toMillis() 
        : typeof data.createdAt === 'number' 
        ? data.createdAt 
        : Date.now()
    };
  });
}

export async function addDish(dishData: any) {
  const createdAt = Date.now();
  const docRef = await addDoc(dishesCollection, {
    ...dishData,
    createdAt,
  });
  return { id: docRef.id, ...dishData, createdAt };
}

export async function getDishById(id: string) {
  const docRef = doc(db, "dishes", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
}
