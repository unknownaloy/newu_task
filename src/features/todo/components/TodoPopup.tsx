import { useRef } from "react";
import useOnClickOutside from "../../../common/hooks/useOnOutsideClick";

type TodoPopupProp = {
  showPopup: boolean;
  closePopup: () => void;
  onComplete: () => void;
  onEdit: () => void;
};

const TodoPopup = ({
  showPopup,
  closePopup,
  onComplete,
  onEdit,
}: TodoPopupProp) => {
  const popupRef = useRef(null);

  useOnClickOutside(popupRef, () => closePopup());
  return (
    <>
      {showPopup && (
        <div
          ref={popupRef}
          className="transition-all z-40 absolute bg-white w-[96px] flex flex-col gap-[10px] h-auto shadow-md rounded-[4px] lg:right-[-88px] right-[-2px] top-[-8px] py-[8px] px-[16px]"
        >
          <div
            onClick={() => {
              onComplete();
              closePopup();
            }}
            className="font-normal text-[14px] hover:font-semibold transition-all cursor-pointer"
          >
            Complete
          </div>
          <div
            onClick={() => {
              onEdit();
              closePopup();
            }}
            className="font-normal text-[14px] hover:font-semibold transition-all cursor-pointer"
          >
            Edit
          </div>
        </div>
      )}
    </>
  );
};

export default TodoPopup;
