import { useState } from "react";
import  SideMenu  from "../components/sideMenu.jsx";
import '../styles/GoftarPage.css';
import DropDown from "../components/dropDown";
import GoftarMain from "../components/Goftar/GoftarMain.jsx";


const Goftar = () => {
    const [isResp, setIsResp] = useState(false);
  
    return (
      <div className="goftar">
        <DropDown isResp={isResp} setIsResp={setIsResp} />
        <GoftarMain/>       
        <SideMenu isResp={isResp} setIsResp={setIsResp} />
      </div>
    );
  };
  
  export default Goftar;