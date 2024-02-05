import { DocumentReference, collection, doc } from "firebase/firestore";
import { db } from "../../common/config/firebaseConfig";


export const todoDocumentReference = (userId: string): DocumentReference => doc(collection(db, "users", userId, "todos"));


