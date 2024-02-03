import React from "react";

type ModalProps = {
  open: boolean;
  //   onClose: React.MouseEvent<HTMLButtonElement>;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = ({ open, onClose, children }: ModalProps) => {
  // Backdrop
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center ${open ? "visible bg-black bg-opacity-20" : "invisible"}`}
    >
      {/* Modal */}
      <div
        onClick={e => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          &#x2715;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
