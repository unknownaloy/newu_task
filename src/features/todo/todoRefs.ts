import { DocumentReference, collection, doc } from "firebase/firestore";
import { db } from "../../common/config/firebaseConfig";
import { useAuth } from "../authentication/authContext";


export const todoDocumentReference = (userId: string): DocumentReference => doc(collection(db, "users", userId, "todos"));


