import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/store/todoSlice";
import authReducer from "../features/authentication/store/authSlice";

export const store = configureStore({
    reducer: { todo: todoReducer, auth: authReducer }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>

// export default store