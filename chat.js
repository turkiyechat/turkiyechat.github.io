import { db } from "./firebase.js";

import {
collection,
addDoc,
query,
orderBy,
onSnapshot,
serverTimestamp,
updateDoc,
deleteDoc,
doc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const CHAT_ID = "global";

/* MESAJ GÖNDER */

export async function sendMessage(user, text) {

    if (!text || text.trim() === "") return;

    await addDoc(
        collection(db, "chats", CHAT_ID, "messages"),
        {
            uid: user.uid,
            username: user.username,
            photo: user.photo || "",
            text: text,
            createdAt: serverTimestamp(),
            edited: false,
            deleted: false
        }
    );

}

/* MESAJLARI DİNLE */

export function listenMessages(callback) {

    const q = query(
        collection(db, "chats", CHAT_ID, "messages"),
        orderBy("createdAt")
    );

    return onSnapshot(q, (snapshot) => {

        const messages = [];

        snapshot.forEach(docSnap => {

            messages.push({
                id: docSnap.id,
                ...docSnap.data()
            });

        });

        callback(messages);

    });

}

/* MESAJ DÜZENLE */

export async function editMessage(messageId, newText) {

    await updateDoc(
        doc(db, "chats", CHAT_ID, "messages", messageId),
        {
            text: newText,
            edited: true
        }
    );

}

/* MESAJ SİL */

export async function deleteMessage(messageId) {

    await deleteDoc(
        doc(db, "chats", CHAT_ID, "messages", messageId)
    );

}