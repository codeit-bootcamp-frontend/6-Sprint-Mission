import Dropdown, { DropdownItemProps } from "./Dropdown";
import ArrowDownIcon from "/public/images/ic_arrow-down.svg";

interface PrimaryDropdownProps {
  buttonContent: React.ReactNode | string;
  options: DropdownItemProps[];
  position?: "center" | "left" | "right";
}

const PrimaryDropdown = ({
  buttonContent = "",
  options,
  position = "left",
}: PrimaryDropdownProps) => {
  const baseStyle =
    "px-24 py-4 hover:opacity-50 min-w-122 h-42 dark:bg-transparent";

  const positionStyle =
    position === "center"
      ? "left-1/2 transform -translate-x-1/2"
      : position === "right"
        ? "left-full transform -translate-x-full"
        : "left-0";

  return (
    <Dropdown className="w-[max-content]">
      {typeof buttonContent === "string" ? (
        <Dropdown.Button
          className={`${baseStyle} bg-white border-1 border-gray-200 rounded-12 flex items-center justify-between gap-8 dark:bg-transparent`}
          activeClassName="[&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:rotate-180">
          {buttonContent}
          <ArrowDownIcon />
        </Dropdown.Button>
      ) : (
        <Dropdown.Button>{buttonContent}</Dropdown.Button>
      )}

      <Dropdown.Content
        className={`min-w-100 w-[max-content] flex flex-col mt-8 bg-white border border-gray-200 rounded-12 shadow-sm overflow-hidden [&_button]:border-b-1 [&_button]:border-gray-200 [&_button:last-of-type]:border-none dark:bg-transparent ${positionStyle}`}>
        {options.map((option) => (
          <Dropdown.Item
            className={`${baseStyle} w-full`}
            key={option.value}
            {...option}
          />
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
};

export default PrimaryDropdown;
