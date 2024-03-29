import { ITodoData } from "../../../common/interfaces/ITodoData";
import { capitalizeFirstLetter } from "../../../utils/todoHelper";

type CompletedCardProp = {
  todo: ITodoData;
};

const CompletedCard = ({ todo }: CompletedCardProp) => {
  return (
    <div className="flex flex-col gap-[10px] bg-white shadow-md rounded-[4px] p-[16px] mb-[10px]">
      <h6 className="font-bold text-[16px]">{todo.title}</h6>
      <div className="flex flex-wrap gap-[8px]">
        {todo.daysPerWeek.map(day => (
          <div
            className="rounded-[8px] px-[4px] py-[1px] bg-white text-accent border-accent border-[2px]"
            key={day}
          >
            {capitalizeFirstLetter(day)}
          </div>
        ))}
      </div>

      <span className="font-semibold text-[14px]">Streak: {todo.streak}</span>
      {todo.longestStreak > 0 && (
        <span className="font-bold text-[14px]">
          Longest Streak: {todo.longestStreak}
        </span>
      )}
    </div>
  );
};

export default CompletedCard;
