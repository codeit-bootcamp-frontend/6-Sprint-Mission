interface EmptyProps {
  text: string;
}

const Empty: React.FC<EmptyProps> = ({ text }) => {
  return <div className="flex text-[#000000] text-lg font-bold">{text}</div>;
};

export default Empty;
