import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const app = firebase.initializeApp({
  apiKey: import.meta.env.VITE_APP_APIKEY,
  authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
  projectId: import.meta.env.VITE_APP_PROJECTID,
  storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_APP_MESSAGINGSENDID,
  appId: import.meta.env.VITE_APP_APPID
})

export const auth = app.auth()
export default app