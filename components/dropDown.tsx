import React, { createContext, useContext, useState } from "react";

interface DropdownContextProps {
  isOpen: boolean;
  toggleDropdown: () => void;
}

const DropdownContext = createContext<DropdownContextProps>({
  isOpen: false,
  toggleDropdown: () => {},
});

export const useDropdown = () => useContext(DropdownContext);

interface DropdownProps {
  children: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContext.Provider value={{ isOpen, toggleDropdown }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
};

export const DropdownToggle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { toggleDropdown } = useDropdown();

  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={toggleDropdown}
    >
      {children}
    </button>
  );
};

export const DropdownMenu: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isOpen } = useDropdown();

  return isOpen ? (
    <div className="absolute mt-2 bg-white border rounded shadow-lg">
      {children}
    </div>
  ) : null;
};

export const DropdownItem: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{children}</div>
  );
};
