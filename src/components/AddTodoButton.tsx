import { useState } from "react";
import Modal from "./Modal";

const AddTodoButton = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-[600px] flex flex-col">
            <h1 className="font-medium text-[18px]">Add Todo</h1>
        </div>
      </Modal>
      <button
        onClick={() => setOpen(true)}
        className="rounded-[10px] bg-accent px-[24px] py-[8px] text-white h-[48px]"
      >
        Add Todo
      </button>
    </>
  );
};

export default AddTodoButton;
