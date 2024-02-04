import { DocumentReference, collection, doc, setDoc } from "firebase/firestore";

import { IToDoData } from "../../../common/interfaces/ITodoData";


export const saveTodoInDatabase = async (data: IToDoData, documentReference: DocumentReference) => {
    const response = await setDoc(documentReference, data);
    return response;
}