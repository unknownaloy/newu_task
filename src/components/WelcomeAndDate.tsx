import { useEffect, useState } from "react";

import { getCurrentDate } from "../utils/calendarUtils";
import AddTodoButton from "./AddTodoButton";

const WelcomeAndDate = () => {
  const [currentDate, setCurrentDate] = useState(getCurrentDate);

  useEffect(() => {
    // Ensure that the date stays updated
    const intervalId = setInterval(() => {
      setCurrentDate(getCurrentDate);
    }, 1000 * 60); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="justify-between p-[24px] flex">
      <div className="flex flex-col">
        <h1 className="font-semibold text-[28px]">Today Activities</h1>
        <p className="text-[14px] font-normal text-[#5F6D7E]">{currentDate}</p>
      </div>
      <AddTodoButton />
    </div>
  );
};

export default WelcomeAndDate;
