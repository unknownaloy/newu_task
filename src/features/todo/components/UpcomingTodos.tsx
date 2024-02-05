import React from "react";
import { useAppSelector } from "../../../app/hooks";
import CompletedCard from "./CompleteCard";

type CompletedTodosProp = {
  children: React.ReactNode;
};

const UpcomingTodos = () => {

  const upcomingTodos = useAppSelector(state => state.todo.upcomingDailyTodos);
  
  return (
    <div className="font-semibold col-span-3 w-auto h-auto">
      <div className="flex flex-col">
        <h1 className="self-center font-semibold mb-[10px]">Upcoming Daily Todos</h1>

        {upcomingTodos.map(todo => (
          <CompletedCard key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingTodos;
