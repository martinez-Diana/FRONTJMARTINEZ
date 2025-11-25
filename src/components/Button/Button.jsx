import "./Button.css";

export default function Button({ text, type = "primary", onClick }) {
  return (
    <button className={`btn ${type}`} onClick={onClick}>
      {text}
    </button>
  );
}
