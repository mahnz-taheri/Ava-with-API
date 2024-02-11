import { useState, useRef, useEffect, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Output from '../../outputs/output.jsx';
import { uploadIcon } from '../../../svgs/svg.jsx';
import { fileHandler } from '../../../myFunctions/goftarUploadFuncs.jsx';
import '../../../styles/Goftar/TabContents/UploadContent.css';
import Loader from "../../Loader.jsx";
import { uploadApi } from "../../../api/Api.jsx";

const UploadContent = ({langSelect}) => {
  const [isFetch, setIsFetch] = useState(false);
  const [startFetch, setStartFetch] = useState(false);
  const [paused, setPaused] = useState(true);
  const [file, setFile] = useState(undefined);
  const [filePath, setFilePath] = useState(null);
  const audioRef = useRef(null);
  const [Duration, setDuration] = useState(0);
  const [text, setText] = useState([
    { start: "0:00:00", end: "0:00:00", text: "" },
  ]);
  const notify = (value) => toast.error(value);

   
  // run upload api when file selected - upload api
  useEffect(() => {
    if (file) {
      uploadApi({
        setDuration,
        setStartFetch,
        setIsFetch,
        setText,
        notify,
        langSelect,
        file,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  // file handler
  const handleFileChange = (event) => {
    fileHandler({ event, setFile, setFilePath });
  };

  return (
    <div className="goftar-upload">
      <audio
        id="audio"
        preload="none"
        ref={audioRef}
        style={{ display: "none" }} 
        onContextMenu={() => false}
        onEnded={() => setPaused(true)}
        hidden
        src={filePath ? filePath : ""}
      ></audio>
      {isFetch ? (
        // output after fetch
        <div className="goftar-upload-fetch">
          <Output
            setPaused={setPaused}
            paused={paused}
            audioRef={audioRef && audioRef}
            text={text}
            currentTab={"upload"}
            duration={Duration}
            lang={langSelect}
            setIsFetch={setIsFetch}
          />
        </div>
      ) : // home ai content output - before fetch from server
      startFetch ? (
        <Loader />
      ) : (
        //  before fetch 
        <motion.div
          className="goftar-upload-prefetch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <label htmlFor="upload-file">
            <div className="upload-icon-container">
              {uploadIcon}
            </div>
            <input
              id="upload-file"
              type="file"
              name="upload-file"
              accept=".mpeg,.mp3,.wave,.mp4"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </label>
          <span className="upload-text">
            برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید متن پیاده
            شده آن، در اینجا ظاهر می شود
          </span>
        </motion.div>
      )}
      
    </div>
  );
};

export default UploadContent;