import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyBPWvExtbpHLd0Kb4JFMzUtjtoKNqOFIKI",
  authDomain: "realtime-chat-b8c4d.firebaseapp.com",
  projectId: "realtime-chat-b8c4d",
  storageBucket: "realtime-chat-b8c4d.firebasestorage.app",
  messagingSenderId: "166057939381",
  appId: "1:166057939381:web:d46b515aeea0190bff49fc",
  measurementId: "G-B8K5X8BRH6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)
const db = getFirestore(app)


export const signUp = async (ursername, email, password) => {
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            username: username.toLowerCase(),
            email: email,
            name: "",
            avatar: "",
            bio: "You are using the ChatApp",
            lastSeen: Date.now()
        })
        await setDoc(doc(db, "chats", user.uid), {
            chatData: [],
        })
    }
    catch (err){
        console.error(err)
        toast.error(err.code)
    }
}   