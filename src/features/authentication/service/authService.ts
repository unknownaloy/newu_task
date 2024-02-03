import { v4 as uuidv4 } from 'uuid';


// This function generates a unique ID using the "uuid" library
// and stores in the browser local storage
const generateAndStoreUserId = (): string => {
    const userId = uuidv4();

    // Persist userId
    localStorage.setItem("userId", userId);
    return userId;
}


// This function return the unique ID of a user
// NOTE: Based on browser in use
export function getUserId(): string {
    let userId =
        localStorage.getItem("userId");

    if (userId == null) {
        userId = generateAndStoreUserId();
    }

    return userId;
}