import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";

import { db } from "../../../common/config/firebaseConfig";
import { ITodoData } from "../../../common/interfaces/ITodoData";
import { RootState } from "../../../app/store";
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


// TODO: Add try-catch
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async (userId: string) => {
    const querySnapshot = await getDocs(collection(db, "users", userId, "todos"));
    const todos = querySnapshot.docs.map(doc => (doc.data() as ITodoData));

    return todos;
});


// TODO: Add try-catch
export const addTodo = createAsyncThunk("todo/addTodo", async (todo: ITodoData, thunkApi) => {
    const state = thunkApi.getState() as RootState;

    const todoRef = doc(collection(db, "users", state.auth.userId, "todos"));

    const data = { id: todoRef.id, ...todo };

    await setDoc(todoRef, data);

    return data;
});


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

            console.log("todoSlice - completeDailyTodo -- daysDifference -> ", daysDifference);


            // If the difference is greater than 7, it indicates that the streak has been
            // broken and needs to be reset
            if (daysDifference > 7) {
                // updatedData = { ...todo, streak: 0, lastStreak: null };
                updatedData = { ...todo, streak: 0, };
            } else {
                // Streak still intact, increment streak and update lastStreak to today.
                updatedData = { ...todo, streak: todo.streak++, lastStreak: today.getTime() };
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
                updatedData = { ...todo, streak: todo.streak++, lastStreak: today.getTime() };
            }
        }


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
                console.log("todo -", todo)



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

                    } else if (todo.lastStreak == null && (todayWeekName !== todo.daysPerWeek[0])) {

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

                console.log("todayWeekName - ", todayWeekName);
                console.log("todo-day - ", action.payload.daysPerWeek[0]);

                if (todayWeekName !== action.payload.daysPerWeek[0]) {
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
        builder.addCase(completeDailyTodo.fulfilled, (state, action) => {

            const updatedDailyTodo = state.dailyTodos.filter(todo => todo.id !== action.payload.id);

            state.completedDailyTodos.unshift(action.payload)

            state.dailyTodos = updatedDailyTodo;
        })
    },
});


export const { setDailyTodos, setWeeklyTodos } = todoSlice.actions;
export default todoSlice.reducer;