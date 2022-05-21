  // Initialize Firebase
  import { initializeApp } from 'firebase/app';
  import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from 'firebase/auth';
  import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
  
  const firebaseConfig = {
    apiKey: "AIzaSyAQzcRPxYSDnwI_gfzY5DkG7Pt5SfORLSc",
    authDomain: "crown-db-cbf3d.firebaseapp.com",
    projectId: "crown-db-cbf3d",
    storageBucket: "crown-db-cbf3d.appspot.com",
    messagingSenderId: "377317370440",
    appId: "1:377317370440:web:8d01671314e1c82206c67d",
    measurementId: "G-263Y3VEC7H"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);
  
  const googleProvider = new GoogleAuthProvider();
  
  googleProvider.setCustomParameters({
    prompt: 'select_account',
  });
  
  export const auth = getAuth();
  export const signInWithGooglePopup = () =>
    signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () =>
    signInWithRedirect(auth, googleProvider);
  
  export const db = getFirestore();
  
  export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
  ) => {
    if (!userAuth) return;
  
    const userDocRef = doc(db, 'users', userAuth.uid);
  
    const userSnapshot = await getDoc(userDocRef);
  
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userDocRef;
  };
  
  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  
  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await signInWithEmailAndPassword(auth, email, password);
  };

  export const signOutUser = async () => await signOut(auth); 

  export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);