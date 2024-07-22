import { useState } from "react";

const useToggle = (initialToggle: boolean): [boolean, () => void] => {
  const [toggle, setToggle] = useState<boolean>(initialToggle ?? false);

  const handleToggle = () => {
    setToggle((prevToggle) => !prevToggle);
  };

  return [toggle, handleToggle];
};

export default useToggle;
