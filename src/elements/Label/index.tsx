import React from "react";

type LabelProps = {
  title?: string;
};

const Label: React.FC<LabelProps> = ({ title }) => {
  return (
    <div className="text-[20px] tablet:text-[13px] tokentemp:text-[10px] leading-[18px] mobile:leading-[12px] tracking-[1px] text-[#828282]">
      {title}
    </div>
  );
};

export default Label;
