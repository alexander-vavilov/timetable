import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyAyNV6uoK3l-5sFTHpgZbS6pnvTy0GxR3w',
	authDomain: 'lama-chat-ec871.firebaseapp.com',
	projectId: 'lama-chat-ec871',
	storageBucket: 'lama-chat-ec871.appspot.com',
	messagingSenderId: '250242125471',
	appId: '1:250242125471:web:75341cbeaa122a4913dcaa',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore(app)
export const storage = getStorage()
export const provider = new GoogleAuthProvider()
