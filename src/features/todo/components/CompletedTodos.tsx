import CompletedCard from "./CompleteCard";
import { useAppSelector } from "../../../app/hooks";

const CompletedTodos = () => {
  const completedTodos = useAppSelector(
    state => state.todo.completedDailyTodos
  );

  return (
    <div className="font-semibold col-span-3 w-auto h-auto">
      <div className="flex flex-col">
        <h1 className="self-center font-semibold mb-[10px]">
          Completed Daily Todos
        </h1>

        {completedTodos.map(todo => (
          <CompletedCard key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
};

export default CompletedTodos;
