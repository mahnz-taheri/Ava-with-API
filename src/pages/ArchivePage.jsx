import { useState } from "react";
import ArchiveMain from "../components/Archive/ArchiveMain.jsx";
import SideMenu from '../components/sideMenu.jsx';
import DropDown from "../components/dropDown.jsx";
import '../styles/ArchivePage.css';

const Archive = () => {
  const [isResp, setIsResp] = useState(false);

  return (
    <div className="archive">
      <DropDown isResp={isResp} setIsResp={setIsResp} />
      <ArchiveMain/>
      <SideMenu isResp={isResp} setIsResp={setIsResp} />
    </div>
  );
};

export default Archive;