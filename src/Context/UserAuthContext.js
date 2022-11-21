import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../Firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [rows, setRows] = useState([]);

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signUp(email, password) {
    return (
        createUserWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
            const user = userCredential.user;
            const userRef = doc(db, "Users", user.uid)
            const userCollectionRef = collection(db, "Users")
            const userCollectionData = await getDocs(userCollectionRef).then((docs) => {
                var rowsdocs = []
                docs.forEach((doc) => {
                    const data = doc.data()
                    rowsdocs = [...rowsdocs, data]
                });
                return rowsdocs
            });
            console.log(userCollectionData,"userRefdata")
            const userData = {
                Email: email,
                Password: password,
                Username: null,
                Role: {user: true, editor: false, admin: false},
                userID: user.uid,
                id: userCollectionData.length + 1
            }
            setDoc(userRef, userData)
        })
    );
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,  (currentuser) => {
        console.log(currentuser, 'user')
        if(currentuser !== null) {
            const userID = currentuser.uid;
            const userDoc = doc(db, "Users", userID)
            getDoc(userDoc).then((snapShot) => {
                return (
                    setUser(snapShot.data())
                )
            })
        } else if (currentuser === null) {
            setUser(currentuser);
        }
    });
    const userDoc = collection(db, "Users")
    const Datarows = async () => { 
        const userData = await getDocs(userDoc).then((docs) => {
            var rowsdocs = []
            docs.forEach((doc) => {
                const data = doc.data()
                rowsdocs = [...rowsdocs, data]
            });
            return rowsdocs
        });
        setRows(userData)
    }
    return () => {
      unsubscribe();
      Datarows();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn, rows }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}