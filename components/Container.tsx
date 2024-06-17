import React from 'react';

type TContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: TContainerProps) {
  return (
    <div className="lg:w-[1200px] md:w-[696px] sm:w-[343px]">{children}</div>
  );
}
