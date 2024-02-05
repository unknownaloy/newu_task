import React from "react";

type WeeklyCardProp = {
  title: string;
  timesPerWeek: number;
  streak: number;
};

const WeeklyCard = ({ title, streak, timesPerWeek }: WeeklyCardProp) => {
  return (
    <div className="flex flex-col gap-[10px] bg-white shadow-md rounded-[4px] p-[16px] mb-[10px]">
      <h6 className="font-bold text-[16px]">{title}</h6>

      <span>Times per week: {timesPerWeek}</span>

      <span>Streak: {streak}</span>
    </div>
  );
};

export default WeeklyCard;
