type Props = {
  firstButtonName: string;
  secondButtonName: string;
  handleFirstButton: () => void;
  handleSecondButton: () => void;
  isDisplay: boolean;
};

export default function SelectBox({
  firstButtonName,
  secondButtonName,
  handleFirstButton,
  handleSecondButton,
  isDisplay,
}: Props) {
  return (
    <>
      {isDisplay ? (
        <ul className={`w-[100px] absolute mt-1 bg-white sm:right-0 rounded-t-xl rounded-b-xl`}>
          <li>
            <button
              className={`w-[100px] h-[42px] border-t border-x rounded-t-xl border-cool-gray200`}
              type='button'
              onClick={handleFirstButton}>
              {firstButtonName}
            </button>
          </li>
          <li>
            <button
              className={`w-[100px] h-[42px] border rounded-b-xl border-cool-gray200`}
              type='button'
              onClick={handleSecondButton}>
              {secondButtonName}
            </button>
          </li>
        </ul>
      ) : (
        ''
      )}
    </>
  );
}
