import React from "react";
import WeeklyCard from "./WeeklyCard";
import { useAppSelector } from "../../../app/hooks";

type WeeklyTodosProp = {
  children: React.ReactNode;
};

const WeeklyTodos = () => {
  const weeklyTodos = useAppSelector(state => state.todo.weeklyTodos);

  return (
    <div className="font-semibold col-span-3 w-auto h-auto">
      <div className="flex flex-col">
        <h1 className="self-center font-semibold mb-[10px]">Weekly Todos</h1>

        {weeklyTodos.map(todo => (
          <WeeklyCard
            key={todo.id}
            title={todo.title}
            timesPerWeek={todo.timesPerWeek ?? 1}
            streak={todo.streak}
          />
        ))}
      </div>
    </div>
  );
};

export default WeeklyTodos;
