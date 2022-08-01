import { db } from "./firebaseConfig";

const stuRef = db.collection("students")

export async function getStudentProfile() {
    const snapshot = await stuRef.get()
    return snapshot;
}