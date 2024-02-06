import { useRef, useState } from "react";
import MoreVert from "./MoreVert";
import useOnClickOutside from "../../../common/hooks/useOnOutsideClick";
import { ITodoData } from "../../../common/interfaces/ITodoData";
import { useAppDispatch } from "../../../app/hooks";
import { completeDailyTodo } from "../store/todoSlice";
import TodoPopup from "./TodoPopup";
import Modal from "../../../shared/Modal";
import TodoForm from "./TodoForm";

type DailyCardProp = {
  todo: ITodoData;
};

const DailyCard = ({ todo }: DailyCardProp) => {
  const dispatch = useAppDispatch();

  const popupRef = useRef(null);

  useOnClickOutside(popupRef, () => setShowOption(false));

  const [showOption, setShowOption] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleShowPopup = (): void => {
    setShowOption(prevState => !prevState);
  };

  const handleOnCompleted = (): void => {
    dispatch(completeDailyTodo(todo));
  };

  return (
    <div className="flex flex-col gap-[10px] bg-white shadow-md rounded-[4px] p-[16px] mb-[10px] relative">
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
      <div className="flex flex-wrap gap-[8px]">
        {todo.daysPerWeek.map(day => (
          <div
            className="rounded-[8px] px-[4px] py-[1px] bg-white text-accent border-accent border-[2px]"
            key={day}
          >
            {day}
          </div>
        ))}
      </div>

      <span>Streak: {todo.streak}</span>
      {todo.longestStreak > 0 && (
        <span>Longest Streak: {todo.longestStreak}</span>
      )}
    </div>
  );
};

export default DailyCard;
