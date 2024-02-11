import '../../../styles/Goftar/TabContents/Contents.css';
import LinkContent from './LinkContent';
import RecordContent from "./RecordContent";
import UploadContent from './UploadContent';

const Contents = ({ activetab , langSelect}) => {
  return (
    <div
      className={
        activetab === 1
          ? "bottom-form-content-active-record-border-add-bottom-form-content"
          : activetab === 2
          ? "bottom-form-content-active-archive-border"
          : activetab === 3
          ? "bottom-form-content-active-link-border"
          : ""
      }
    >
      {activetab === 1 ? (
       <RecordContent langSelect={langSelect}/>
      ) : activetab === 2 ? (
       <UploadContent langSelect={langSelect}/>
      ) : activetab === 3 ? (
       <LinkContent langSelect={langSelect} />
      ) : undefined}
    </div>
  );
};

export default Contents;