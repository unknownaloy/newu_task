import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";

import { db } from "../../../common/config/firebaseConfig";
import { RootState } from "../../../app/store";
import { ITodoData } from "../../../common/interfaces/ITodoData";
import { getDayOfWeekFromDate, isSameDay, subtractDates } from "../../../utils/dateHelper";


interface TodoState {
    dailyTodos: ITodoData[],
    weeklyTodos: ITodoData[],
    completedDailyTodos: ITodoData[],
    upcomingDailyTodos: ITodoData[],
    status: "idle" | "loading" | "successful" | "failure"
}


// dailyTodos: This array holds the todos that should be completed today
// weeklyTodos: This array holds the todos that should be completed this week
// completedDailyTodos: This array holds the daily todos that have been completed
// upcomingDailyTodos: This array holds the daily todos that are yet to come
const initialState: TodoState = {
    dailyTodos: [],
    weeklyTodos: [],
    completedDailyTodos: [],
    upcomingDailyTodos: [],
    status: "idle",
}


// Fetch a user todo from cloud firestore
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async (userId: string) => {
    const querySnapshot = await getDocs(collection(db, "users", userId, "todos"));
    const todos = querySnapshot.docs.map(doc => (doc.data() as ITodoData));

    return todos;
});


// Add a new todo to cloud firestore
export const addTodo = createAsyncThunk("todo/addTodo", async (todo: ITodoData, thunkApi) => {
    const state = thunkApi.getState() as RootState;

    const todoRef = doc(collection(db, "users", state.auth.userId, "todos"));

    const data = { ...todo, id: todoRef.id };

    await setDoc(todoRef, data);

    return data;
});


// Update/Edit a todo
export const updateATodo = createAsyncThunk("todo/updateATodo", async (todo: ITodoData, thunkApi) => {
    const updatedData = { ...todo };
    const state = thunkApi.getState() as RootState;

    const todoRef = doc(db, "users", state.auth.userId, "todos", todo.id!);

    await updateDoc(todoRef, updatedData);

    return todo;
});


// Function to make a daily todo as completed
export const completeDailyTodo = createAsyncThunk("todo/completeDailyTodo", async (todo: ITodoData, thunkApi) => {

    // Mutable copy of the todo
    let updatedData = { ...todo };

    const today = new Date();

    // User already has a streak on todo
    if (todo.lastStreak != null) {

        const lastStreak = new Date(todo.lastStreak);

        // User only selected a single day in a week for todos
        if (todo.daysPerWeek.length === 1) {
            const daysDifference = subtractDates(today, lastStreak);

            // If the difference is greater than 7, it indicates that the streak has been
            // broken and needs to be reset
            if (daysDifference > 7) {
                // updatedData = { ...todo, streak: 0, lastStreak: null };
                updatedData = { ...todo, streak: 0, };
            } else {
                // Streak still intact, increment streak and update lastStreak to today.
                updatedData = { ...todo, streak: todo.streak + 1, lastStreak: today.getTime() };
            }

        } else {
            // User has more than 1 day of the week set
            const todayWeekName = getDayOfWeekFromDate(today);

            const indexOfDay = todo.daysPerWeek.indexOf(todayWeekName);

            let previousDay = "";

            if (indexOfDay === 0) {
                // First day in the array of daysPerWeek
                previousDay = todo.daysPerWeek[todo.daysPerWeek.length - 1];
            } else {
                // Get the previous day of task completion
                previousDay = todo.daysPerWeek[indexOfDay - 1];
            }

            const lastStreakDayOfWeek = getDayOfWeekFromDate(lastStreak);

            // To maintain a streak, the last recorded streak day of the week (lastStreakDayOfWeek)
            // should match the day in the daysPerWeek array that precedes the current day.
            if (lastStreakDayOfWeek === previousDay) {
                updatedData = { ...todo, streak: 0 };
                // updatedData = { ...todo, streak: 0, lastStreak: null };
            } else {
                updatedData = { ...todo, streak: todo.streak + 1, lastStreak: today.getTime() };
            }
        }


    } else if (todo.lastStreak == null && todo.streak >= 1) {
        // User edited their todo
        updatedData = { ...todo, streak: todo.streak + 1, lastStreak: today.getTime() }
    } else {

        //User don't have a lastStreak set
        updatedData = { ...todo, streak: 1, lastStreak: today.getTime() }
    }

    // If the current streak is greater than the longest streak, update the value.
    if (updatedData.streak > todo.longestStreak) {
        updatedData = { ...updatedData, longestStreak: updatedData.streak };
    }

    const state = thunkApi.getState() as RootState;

    const todoRef = doc(db, "users", state.auth.userId, "todos", todo.id!);

    await updateDoc(todoRef, updatedData);

    return updatedData;
});


// Function to mark a weekly todo as completed
export const completeWeeklyTodo = createAsyncThunk("todo/completeWeeklyTodo", async (todo: ITodoData, thunkApi) => {

    // Mutable copy of the todo
    let updatedData = { ...todo };


    // NOTE: User lastStreak cannot be null because it is set when creating a weekly todo
    if (todo.lastStreak != null) {
        const currentWeek = new Date().getTime();

        // Calculates the difference in weeks between the current week and the week of the last saved streak
        // NOTE: Will be 0 if the same week
        const weekDifference = Math.round((currentWeek - todo.lastStreak) / (1000 * 60 * 60 * 24 * 7));

        if (weekDifference === 0) {
            // Same week just increase streak and update last
            // updatedData = { ...todo, streak: todo.streak++ };

            updatedData = { ...todo, streak: todo.streak + 1 };
        } else {
            // If the user is in a new week, calculate what the streak should be if not reset.
            // NOTE: `timesPerWeek` cannot be null.
            const streakValueIfNotReset = weekDifference * todo.timesPerWeek!

            if (streakValueIfNotReset >= todo.streak) {
                // User todo streak is maintained
                updatedData = { ...todo, streak: todo.streak + 1 };
            } else {
                // User has broken todo streak
                updatedData = { ...todo, streak: 0, lastStreak: currentWeek }
            }
        }
    }


    // If the current streak is greater than the longest streak, update the value.
    if (updatedData.streak > todo.longestStreak) {
        updatedData = { ...updatedData, longestStreak: updatedData.streak };
    }

    const state = thunkApi.getState() as RootState;

    const todoRef = doc(db, "users", state.auth.userId, "todos", todo.id!);

    await updateDoc(todoRef, updatedData);

    return updatedData;

});

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        // Set daily todos
        setDailyTodos(state, action: PayloadAction<ITodoData[]>) {
            state.dailyTodos = action.payload;
        },
        setWeeklyTodos(state, action: PayloadAction<ITodoData[]>) {
            state.weeklyTodos = action.payload;
        }
        // Set weekly todos
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state, action) => {
            state.status = "loading";
        })
        builder.addCase(fetchTodos.fulfilled, (state, action) => {

            const daily: ITodoData[] = [];
            const weekly: ITodoData[] = [];
            const dailyTodoCompleted: ITodoData[] = [];
            const upcomingTodo: ITodoData[] = [];

            // Separating daily and weekly todos into different arrays
            action.payload.forEach(todo => {

                if (todo.trackingType === "daily") {

                    const today = new Date();

                    const todayWeekName = getDayOfWeekFromDate(today);

                    if (todo.lastStreak != null) {
                        const today = new Date();
                        const isTodoCompleted = isSameDay(today, new Date(todo.lastStreak));

                        // If the todo has been completed on the same day as today, it is added to the list of daily completed todos
                        if (isTodoCompleted) {
                            dailyTodoCompleted.push(todo);
                        } else {
                            daily.push(todo);
                        }

                    } else if (todo.lastStreak == null && !todo.daysPerWeek.includes(todayWeekName)) {

                        // The daily todo is still upcoming and not for the current day
                        upcomingTodo.push(todo);

                    } else {
                        daily.push(todo);

                    }
                } else {
                    weekly.push(todo);
                }
            });

            state.dailyTodos = daily;
            state.weeklyTodos = weekly;
            state.completedDailyTodos = dailyTodoCompleted;
            state.upcomingDailyTodos = upcomingTodo;

            state.status = "successful";
        })
        builder.addCase(addTodo.fulfilled, (state, action) => {

            // If the new todo is "daily" add it to the dailyTodos in store
            if (action.payload.trackingType === "daily") {
                const today = new Date();
                const todayWeekName = getDayOfWeekFromDate(today);


                // The todo doesn't start today, move to upcoming todos
                if (!action.payload.daysPerWeek.includes(todayWeekName)) {
                    state.upcomingDailyTodos.unshift(action.payload);
                    return;
                }
                state.dailyTodos.unshift(action.payload);
            }

            // If the new todo is "weekly" add it to the weeklyTodos in store
            if (action.payload.trackingType === "weekly") {
                state.weeklyTodos.unshift(action.payload);
            }
        })
        builder.addCase(updateATodo.fulfilled, (state, action) => {
            // Check if in DAILY todo and get index
            const indexInDailyTodo = state.dailyTodos.findIndex(todo => todo.id === action.payload.id);

            // Handle for daily
            if (indexInDailyTodo !== -1 && action.payload.trackingType === "daily") {
                // Still a daily todo, update
                state.dailyTodos.splice(indexInDailyTodo, 1, action.payload);
            }

            if (indexInDailyTodo !== -1 && action.payload.trackingType === "weekly") {
                // Todo trackingType was updated from "daily" to "weekly"
                // Remove todo from dailyTodos
                state.dailyTodos.splice(indexInDailyTodo, 1);

                // Add todo to weekly todos
                state.weeklyTodos.unshift(action.payload);

                return;
            }


            // Check if in WEEKLY todo and get index
            const indexInWeeklyTodo = state.weeklyTodos.findIndex(todo => todo.id === action.payload.id);

            // Handle for weekly
            if (indexInWeeklyTodo !== -1 && action.payload.trackingType === "weekly") {
                // Still a weekly todo, update
                state.dailyTodos.splice(indexInWeeklyTodo, 1, action.payload);
            }

            if (indexInWeeklyTodo !== -1 && action.payload.trackingType === "daily") {
                // Todo trackingType was updated from "weekly" to "daily"
                // Remove todo from weeklyTodos
                state.weeklyTodos.splice(indexInWeeklyTodo, 1);

                // Add todo to daily todos
                state.dailyTodos.unshift(action.payload);
            }
        })
        builder.addCase(completeDailyTodo.fulfilled, (state, action) => {

            const updatedDailyTodo = state.dailyTodos.filter(todo => todo.id !== action.payload.id);

            state.completedDailyTodos.unshift(action.payload)

            state.dailyTodos = updatedDailyTodo;
        })
        builder.addCase(completeWeeklyTodo.fulfilled, (state, action) => {
            const indexOfUpdatedTodo = state.weeklyTodos.findIndex(todo => todo.id === action.payload.id);

            if (indexOfUpdatedTodo !== 1) {
                // Updated the todo
                state.weeklyTodos.splice(indexOfUpdatedTodo, 1, action.payload);
            }
        })
    },
});


export const { setDailyTodos, setWeeklyTodos } = todoSlice.actions;
export default todoSlice.reducer;