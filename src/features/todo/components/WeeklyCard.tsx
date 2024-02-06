import { useState } from "react";
import MoreVert from "./MoreVert";
import TodoPopup from "./TodoPopup";
import { ITodoData } from "../../../common/interfaces/ITodoData";
import { useAppDispatch } from "../../../app/hooks";
import { completeWeeklyTodo } from "../store/todoSlice";
import Modal from "../../../shared/Modal";
import TodoForm from "../TodoForm";

type WeeklyCardProp = {
  todo: ITodoData;
};

const WeeklyCard = ({ todo }: WeeklyCardProp) => {
  const dispatch = useAppDispatch();

  const [showOption, setShowOption] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleShowPopup = (): void => {
    setShowOption(prevState => !prevState);
  };

  const handleOnCompleted = (): void => {
    dispatch(completeWeeklyTodo(todo));
  };

  return (
    <div className="relative flex flex-col gap-[10px] bg-white shadow-md rounded-[4px] p-[16px] mb-[10px]">
      <MoreVert
        onClick={handleShowPopup}
        className="absolute top-[16px] right-[16px]"
      />

      <TodoPopup
        showPopup={showOption}
        closePopup={() => setShowOption(false)}
        onComplete={handleOnCompleted}
        onEdit={() => setShowModal(true)}
      />

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="w-[512px] flex flex-col">
          <h1 className="font-medium text-[18px] mb-[18px]">Edit Todo</h1>

          <TodoForm todo={todo} />
        </div>
      </Modal>

      <h6 className="font-bold text-[16px]">{todo.title}</h6>

      <span>Times per week: {todo.timesPerWeek}</span>

      <span>Streak: {todo.streak}</span>
      {todo.longestStreak > 0 && (
        <span>Longest Streak: {todo.longestStreak}</span>
      )}
    </div>
  );
};

export default WeeklyCard;
