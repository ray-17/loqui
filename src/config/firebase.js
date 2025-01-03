
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
 
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    const user = response.user;
    await setDoc(doc(db,"users",user.uid),{
      id:user.uid,
      username:username.toLowerCase(),
      email,
      name:"",
      avatar:"",
      bio:"Hey peeps, I'm using Loqui!",
      lastSeen:Date.now()
    })
    await setDoc(doc(db, "chats", user.uid),{
      chatData:[]
    })
  } catch (error) {
      console.error(error)
      toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async(email, password) => {
    try {
      await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
      console.error(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}


export {signup, login, logout, auth, db}