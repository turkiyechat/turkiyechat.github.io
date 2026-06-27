import {
register,
login,
logout,
resetPassword,
watchAuth
}
from "./auth.js";

import {
sendMessage,
listenMessages
}
from "./chat.js";

import {
db,
storage
}
from "./firebase.js";

import {
doc,
updateDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
ref,
uploadBytes,
getDownloadURL
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

let currentUser = null;

/* LOGIN */

const loginScreen =
document.getElementById("loginScreen");

const profileScreen =
document.getElementById("profileScreen");

const chatScreen =
document.getElementById("chatScreen");

/* TABLAR */

const loginTab =
document.getElementById("loginTab");

const registerTab =
document.getElementById("registerTab");

const loginBox =
document.getElementById("loginBox");

const registerBox =
document.getElementById("registerBox");

/* LOGIN */

const loginEmail =
document.getElementById("loginEmail");

const loginPassword =
document.getElementById("loginPassword");

const loginBtn =
document.getElementById("loginBtn");

const forgotBtn =
document.getElementById("forgotBtn");

/* REGISTER */

const registerEmail =
document.getElementById("registerEmail");

const registerPassword =
document.getElementById("registerPassword");

const registerPassword2 =
document.getElementById("registerPassword2");

const registerBtn =
document.getElementById("registerBtn");

/* PROFİL */

const username =
document.getElementById("username");

const avatar =
document.getElementById("avatar");

const saveProfile =
document.getElementById("saveProfile");

/* CHAT */

const messages =
document.getElementById("messages");

const messageInput =
document.getElementById("messageInput");

const sendBtn =
document.getElementById("sendBtn");

const imageBtn =
document.getElementById("imageBtn");

const imageInput =
document.getElementById("imageInput");

/* KAYIT OL */

registerBtn.onclick = async () => {

    const email = registerEmail.value.trim();

    const password = registerPassword.value;

    const password2 = registerPassword2.value;

    if (email === "" || password === "" || password2 === "") {

        alert("Lütfen tüm alanları doldurun.");

        return;

    }

    if (password !== password2) {

        alert("Şifreler eşleşmiyor.");

        return;

    }

    if (password.length < 6) {

        alert("Şifre en az 6 karakter olmalıdır.");

        return;

    }

    try {

        await register(email, password);

        alert(
`Kayıt başarılı!

${email}

adresine doğrulama e-postası gönderildi.

Lütfen e-postandaki bağlantıya tıkla ve ardından giriş yap.`
        );

        registerEmail.value = "";
        registerPassword.value = "";
        registerPassword2.value = "";

        loginTab.click();

    }

    catch (error) {

        switch (error.code) {

            case "auth/email-already-in-use":
                alert("Bu e-posta zaten kayıtlı.");
                break;

            case "auth/invalid-email":
                alert("Geçersiz e-posta adresi.");
                break;

            case "auth/weak-password":
                alert("Şifre çok zayıf.");
                break;

            default:
                alert(error.message);

        }

    }

};