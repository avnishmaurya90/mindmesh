import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { auth, db } from "./firebase";

export const registerUser = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, {
        displayName: name
    });
    let role = "user";
    let form;
    if (form.email === "admin@gmail.com") {
        role = "admin";
    }
    await set(ref(db, "users/" + user.uid), {
        name,
        email,
        role: role,
        createdAt: Date.now()
    });
    return user;
}

export const loginUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    )
    return userCredential.user
}
export const getUserProfile = async (uid) => {
    const snapshot = await get(ref(db, `users/${uid}`));
    return snapshot.exists() ? snapshot.val() : null
}
export const resetPassword = async (email) => {
    await sendPasswordResetEmail(email)
}