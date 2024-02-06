import { useState } from "react";

import Modal from "./Modal";
import TodoForm from "../features/todo/components/TodoForm";

const AddTodoButton = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div className="lg:w-[512px] flex flex-col w-[320px]">
          <h1 className="font-medium text-[18px] mb-[18px]">Add Todo</h1>

          <TodoForm />
        </div>
      </Modal>
      <button
        onClick={() => setShowModal(true)}
        className="rounded-[10px] bg-accent px-[24px] py-[8px] text-white h-[48px]"
      >
        Add Todo
      </button>
    </>
  );
};

export default AddTodoButton;
