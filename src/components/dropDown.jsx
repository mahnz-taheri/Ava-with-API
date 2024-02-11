import { useState } from "react";
import { Menu } from "@mui/material";
import { userIcon, logoutIcon } from "../svgs/svg";
import "../styles/DropDown.css";

const DropDown = ({ setIsResp }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="dropDown">
      <div
        className={menuOpen ? "change-dropDown-user" : "dropDown-user"}
        style={{height:menuOpen?'110px':'',marginBottom:menuOpen?'100px':''}}
      >
        
        <div className="dropDown-user-top" style={{display:'flex',flexDirection:'row',alignItems:'center' ,gap:'10px'}} onClick={() => setMenuOpen(!menuOpen)}>
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
          <p className="" style={{margin:0, color:"#00BA9F"}}>مهمان</p>
          {userIcon}
        </div>
        {
          menuOpen?
          <>
        <div className="drop-line-space"></div>
        {/*bottom */}
        <div className="dropDown-user-bottom">
          <p className="dropDown-user-logout-text">خروج</p>
          {logoutIcon}
        </div>
        </>
        :<></>
        }
      </div>
      {/* menu  responsive */}
      <div className="menu" onClick={() => setIsResp && setIsResp(true)}>
        <Menu sx={{ color: "#00ba9f" } }  />
      </div>
    </div>
  );
};

export default DropDown;
