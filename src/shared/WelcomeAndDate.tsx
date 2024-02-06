import { useEffect, useState } from "react";

import AddTodoButton from "./AddTodoButton";
import { getCurrentDate } from "../utils/dateHelper";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateLoggedInDay } from "../features/authentication/store/authSlice";
import { fetchTodos } from "../features/todo/store/todoSlice";

const WelcomeAndDate = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(state => state.auth.userId);
  const loggedInDate = useAppSelector(state => state.auth.loggedInDate);

  const [currentDate, setCurrentDate] = useState(getCurrentDate);

  // If the user reaches a new day, refreshes the app, and updates values accordingly.
  // Checks if the current day is greater than the logged-in day, and if so, dispatches actions
  // to update the logged-in day and fetch todos for the user.
  const handlePageRefresh = (): void => {
    const getCurrentDay = new Date().getDay();

    if (getCurrentDay > loggedInDate) {
      dispatch(updateLoggedInDay(getCurrentDay));
      dispatch(fetchTodos(userId));
    }
  };

  useEffect(() => {
    // Ensure that the date stays updated
    const intervalId = setInterval(() => {
      setCurrentDate(getCurrentDate);
      handlePageRefresh();
    }, 1000); // Update every second

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="justify-between p-[24px] flex">
      <div className="flex flex-col">
        <h1 className="font-semibold text-[28px]">Today Activities</h1>
        <p className="text-[14px] font-normal text-[#5F6D7E]">{currentDate}</p>
      </div>
      <AddTodoButton />
    </div>
  );
};

export default WelcomeAndDate;
