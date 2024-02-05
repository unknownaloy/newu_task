type MoreVertProp = {
  className?: string;
  onClick: () => void;
};

const MoreVert = ({ className, onClick }: MoreVertProp) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col gap-[2px] hover:opacity-45 transition-opacity ${className}`}
    >
      <div className="w-[4px] h-[4px] bg-black rounded-full"></div>
      <div className="w-[4px] h-[4px] bg-black rounded-full"></div>
      <div className="w-[4px] h-[4px] bg-black rounded-full"></div>
    </div>
  );
};

export default MoreVert;
