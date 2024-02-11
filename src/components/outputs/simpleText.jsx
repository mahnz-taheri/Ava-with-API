import '../../styles/outputs/simpleText.css';
const SimpleText = ({ text, language }) => {
    return (
      <div
        className={`contain-simple-text ${
          language === "EN" && "change-contain-simple-text"}`}
      >
        <span className="simple-text">{text}</span>
      </div>
    );
  };
  export default SimpleText;