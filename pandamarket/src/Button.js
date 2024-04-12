import "./style/Button.css";
function Button({ children, type }) {
  return (
    <button id="button" type={type}>
      {children}
    </button>
  );
}

export default Button;
