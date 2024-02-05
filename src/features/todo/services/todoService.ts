import { DocumentReference, collection, doc, getDocs, setDoc } from "firebase/firestore";

import { ITodoData } from "../../../common/interfaces/ITodoData";
import { db } from "../../../common/config/firebaseConfig";


export const saveTodoInDatabase = async (data: ITodoData, documentReference: DocumentReference) => {
    const response = await setDoc(documentReference, data);
    return response;
}


export const getAllTodos = async (userId: string) => {
    const querySnapshot = await getDocs(collection(db, "users", userId, "todos"));


    return querySnapshot;
}