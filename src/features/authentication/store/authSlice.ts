import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface AuthState {
    userId: string,
    loggedInDate: number,
}

const initialState: AuthState = {
    userId: "",
    loggedInDate: new Date().getDay(),
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserId(state, action: PayloadAction<string>) {
            state.userId = action.payload;
        },
        updateLoggedInDay(state, action: PayloadAction<number>) {
            state.loggedInDate = action.payload;
        }
    }
});


export const { setUserId, updateLoggedInDay } = authSlice.actions;
export default authSlice.reducer;