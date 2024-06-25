import React, { PropsWithChildren } from "react";

const Title = ({ children }: PropsWithChildren) => {
  return (
    <h3 className="text-xl leading-[1.4] font-bold text-gray-900">
      {children}
    </h3>
  );
};

export default Title;
