import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyALcrtGOhOqa7kr4Dn8Ug4hOsSRsNd0wBI",
  authDomain: "outbuild-kanban.firebaseapp.com",
  projectId: "outbuild-kanban",
  storageBucket: "outbuild-kanban.firebasestorage.app",
  messagingSenderId: "506770747076",
  appId: "1:506770747076:web:e8cb041a0c841df85f6391"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
