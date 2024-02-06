import { useEffect } from "react";

import CompletedTodos from "../features/todo/components/CompletedTodos";
import DailyTodos from "../features/todo/components/DailyTodos";
import WeeklyTodos from "../features/todo/components/WeeklyTodos";
import WelcomeAndDate from "./WelcomeAndDate";
import UpcomingTodos from "../features/todo/components/UpcomingTodos";

import { fetchTodos } from "../features/todo/store/todoSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const HomeScreen = () => {
  const userId = useAppSelector(state => state.auth.userId);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch saved Todos on initial launch
    dispatch(fetchTodos(userId));
  }, [dispatch, userId]);

  return (
    <div className="flex flex-col">
      <WelcomeAndDate />

      <div className="grid grid-cols-12 gap-[16px] mx-[24px] mt-[56px]">
        <DailyTodos />
        <WeeklyTodos />
        <UpcomingTodos />
        <CompletedTodos />
      </div>
    </div>
  );
};

export default HomeScreen;
