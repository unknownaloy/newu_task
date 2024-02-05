import React from "react";
import DailyCard from "./DailyCard";
import { useAppSelector } from "../../../app/hooks";

type DailyTodosProp = {
  children: React.ReactNode;
};

const DailyTodos = () => {
  const dailyTodos = useAppSelector(state => state.todo.dailyTodos);

  return (
    <div className="font-semibold col-span-3 w-auto h-auto">
      <div className="flex flex-col">
        <h1 className="self-center font-semibold mb-[10px]">Daily Todos</h1>

        {dailyTodos.map(todo => (
          <DailyCard key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default DailyTodos;
