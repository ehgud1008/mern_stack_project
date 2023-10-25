import React from "react";
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { app } from '../firebase.js';

export default function OAuth() {
    console.log(import.meta.env.FIREBASE_API_KEY);
    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <button onClick={ handleGoogleLogin } type="button" className="bg-blue-700 text-white p-3 rounded-lg hover:opacity-95">Google 로그인</button>
    )
}