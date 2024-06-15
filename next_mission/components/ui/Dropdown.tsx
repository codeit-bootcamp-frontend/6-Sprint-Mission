import { useState } from 'react';
import SortIcon from '@/public/images/icons/ic_sort.svg';

interface DropdownProps {
  onSortSelection: (sortOption: any) => void;
  sortOptions: { key: string; label: string }[];
}

const Dropdown: React.FC<DropdownProps> = ({
  onSortSelection,
  sortOptions,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleDropdown = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="border rounded-xl border-[#000000] p-2 ml-2"
      >
        <SortIcon alt="정렬" />
      </button>

      {menuVisible && (
        <div className="absolute top-[110%] right-0 bg-[#ffffff] rounded-lg border border-[#000000] z-50">
          {sortOptions.map((option) => {
            return (
              <div
                key={option.key}
                onClick={() => {
                  onSortSelection(option.key);
                  setMenuVisible(false);
                }}
                className="py-3 px-11 border-b-[#000000] border text-base text-[#000000] cursor-pointer"
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
