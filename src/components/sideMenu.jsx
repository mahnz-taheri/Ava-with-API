import '../styles/SideMenu.css';
import { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { archiveIcon, icon, speechIcon } from "../svgs/svg";

const SideMenu = ({ isResp, setIsResp }) => {
  const [currentPage, setCurrentPage] = useState("");
  const SideMenuRef = useRef(null);
  const archiveref = useRef(null)

  useEffect(() => {
    const url = window.location.href;
    if (url.includes("archive")) {
      setCurrentPage("archive");
    } else {
      setCurrentPage("goftar");
    }
  }, []);

  useEffect(() => {
    const mouseHandler = (event) => {
      if (
        SideMenuRef.current &&
        setIsResp &&
        !SideMenuRef.current.contains(event.target)
      ) {
        setIsResp(false);
      }
    };
    document.addEventListener("mousedown", mouseHandler);

    return () => {
      document.removeEventListener("mousedown", mouseHandler);
    };
  }, [setIsResp]);

  return (
    <div
    className={`SideMenu${isResp && "-change-SideMenu"}`}
    ref={SideMenuRef}
    >
      <div className="SideMenu-top">
        <span className="SideMenu-top-text">آوا</span>

        {icon}
      </div>
      {/* SideMenu bottom */}
      <div className="SideMenu-bottom">
        {/*goftar page */}
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <div
            className={`SideMenu-bottom-speech${
              currentPage === "goftar" && "-active-tab"
            }`}
          >
            <span className="rb-speech-text">تبدیل گفتار</span>
            {speechIcon}
          </div>
        </Link>
        {/* archive page */}
        <Link
          to="/archive"
          style={{ textDecoration: "none", color: "inherit" }}
        >
                  <div
                  className={`SideMenu-bottom-archive${
                    currentPage === "archive" && "-active-tab"
                  }`}
                  >
            <span className="rb-archive-text">آرشیو</span>
            {archiveIcon}
          </div>
            </Link>
      </div>
    </div>
  );
};

export default SideMenu;