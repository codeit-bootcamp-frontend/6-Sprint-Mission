import useOutsideClick from '@/hooks/useOutsideClick';
import { Dispatch, SetStateAction, useRef } from 'react';

type SelectBoxProps = {
  items: {
    label: string;
    onClick: () => void;
  }[];
  setSelectBoxIsOpen: Dispatch<SetStateAction<boolean>>;
  exceptions?: React.RefObject<HTMLElement>[];
};

export default function SelectBox({ items, setSelectBoxIsOpen, exceptions = [] }: SelectBoxProps) {
  const dropdownRef = useRef<HTMLUListElement>(null);
  useOutsideClick(dropdownRef, () => setSelectBoxIsOpen(false), exceptions);

  const handleClick = (onClick: () => void) => {
    onClick();
    setSelectBoxIsOpen(false);
  };

  return (
    <ul
      ref={dropdownRef}
      className='flex flex-col gap-1 p-1 mt-1 text-center bg-white border min-w-10 rounded-b-xl rounded-t-xl sm:right-0'>
      {items.map(item => (
        <li key={item.label}>
          <button
            className='h-6 w-[60px] text-[12px] rounded-md hover:bg-brand-blue/10 hover:text-brand-blue'
            type='button'
            onClick={() => handleClick(item.onClick)}>
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
