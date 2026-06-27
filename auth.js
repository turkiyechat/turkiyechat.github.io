import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
sendEmailVerification,
sendPasswordResetEmail,
signOut,
onAuthStateChanged,
reload
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
doc,
setDoc,
getDoc,
serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// KAYIT OL

export async function register(email,password){

    const result =
    await createUserWithEmailAndPassword(
        auth,
        email,
        password
    );

    await sendEmailVerification(result.user);

    await setDoc(
        doc(db,"users",result.user.uid),
        {
            uid:result.user.uid,
            email:email,
            username:"",
            photo:"",
            online:false,
            createdAt:serverTimestamp()
        }
    );

    return result.user;

}



// GİRİŞ

export async function login(email,password){

    const result =
    await signInWithEmailAndPassword(
        auth,
        email,
        password
    );

    await reload(result.user);

    if(!result.user.emailVerified){

        throw new Error(
            "Lütfen önce e-posta adresinizi doğrulayın."
        );

    }

    return result.user;

}



// ŞİFREMİ UNUTTUM

export async function resetPassword(email){

    await sendPasswordResetEmail(
        auth,
        email
    );

}



// ÇIKIŞ

export async function logout(){

    await signOut(auth);

}



// OTURUM TAKİBİ

export function watchAuth(callback){

    onAuthStateChanged(

        auth,

        async(user)=>{

            if(!user){

                callback(null);

                return;

            }

            const snap =
            await getDoc(
                doc(db,"users",user.uid)
            );

            let profile={};

            if(snap.exists()){

                profile=snap.data();

            }

            callback({

                uid:user.uid,
                email:user.email,
                verified:user.emailVerified,
                ...profile

            });

        }

    );

}