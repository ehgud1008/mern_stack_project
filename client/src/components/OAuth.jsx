import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';

export default function OAuth() {
    const dispatch = useDispatch(); 

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);
            
            const response = await fetch('/api/auth/google', {
                method:'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    name : result.user.displayName,
                    email : result.user.email,
                    avatar : result.user.photoURL,
                }),
            });
            alert(response);
            const data = await response.json();
            dispatch(signInSuccess(data));
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <button onClick={ handleGoogleLogin } type="button" className="bg-blue-700 text-white p-3 rounded-lg hover:opacity-95">Google 로그인</button>
    )
}