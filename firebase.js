// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBi41NAltesI9QH2prA_IcrzLSu8LgnUlk",
    authDomain: "fir-javascript-crud-825a7.firebaseapp.com",
    projectId: "fir-javascript-crud-825a7",
    storageBucket: "fir-javascript-crud-825a7.appspot.com",
    messagingSenderId: "299452886819",
    appId: "1:299452886819:web:ad474bb7ab1373005ae696"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()

export const saveTask = (title, description) =>
    addDoc(collection(db, 'tasks'), { title, description })

export const getTasks = () => getDocs(collection(db, 'tasks'))

export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback)

export const deleteTask = (id) => deleteDoc(doc(db, 'tasks', id))

export const getTask = (id) => getDoc(doc(db, 'tasks', id))

export const updateTask = (id, newField) => updateDoc(doc(db, 'tasks', id), newField)