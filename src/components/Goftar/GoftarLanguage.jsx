import '../../styles/Goftar/GoftarLanguage.css';

const GoftarLanguage = ({menuOpen, langSelect, setMenuOpen, setLangSelect,}) => {
  return (
    <div className="goftar-lang">
      <div
        className={
          menuOpen ? "change-bottom-lang-select" : "bottom-lang-select"
        }
      >
        {/* language value */}
        <div
          className="bottom-lang-select-top"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {/* drop icon */}
          <svg
            width="7"
            height="5"
            viewBox="0 0 7 5"
            fill="none"
            className={menuOpen ? "drop-icon" : ""}
          >
            <path
              d="M4.65282 4.12713C4.25404 4.58759 3.53973 4.58759 3.14096 4.12713L1.08888 1.7576C0.528006 1.10995 0.988058 0.102941 1.84481 0.102941L5.94896 0.102942C6.80571 0.102942 7.26577 1.10995 6.70489 1.7576L4.65282 4.12713Z"
              fill="#00BA9F"
            />
          </svg>
          <p className="bottom-lang-select-current-lang">
            {langSelect === "FA" ? "فارسی" : "انگلیسی"}
          </p>
        </div>
        
       <div className="lang-line-space"></div>
        <div
          className="bottom-lang-select-center"
          onClick={() => {
            setMenuOpen(!menuOpen);
            setLangSelect(langSelect === "FA" ?"EN" : "FA");
          }}
        >
          <p className="bottom-lang-select-first">
            {langSelect === "FA" ?"انگلیسی" : "فارسی"}
            </p>
        </div>
      </div>
      {/* title */}
      <span className="bottom-lang-text">:زبان گفتار</span>
    </div>
  );
};

export default GoftarLanguage;