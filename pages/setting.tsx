import { useTheme } from "@/lib/ThemeContext";

export default function Setting() {
  const { theme, setTheme } = useTheme();

  const handleChangeDark = () => {
    setTheme("dark");
  };
  const handleChangeWhite = () => {
    setTheme("White");
  };
  return (
    <>
      <h2>테마를 선택하세요</h2>
      <div onClick={handleChangeWhite}>기본</div>
      <div onClick={handleChangeDark}>다크</div>
    </>
  );
}
