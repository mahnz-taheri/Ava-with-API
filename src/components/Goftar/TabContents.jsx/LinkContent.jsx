import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Output from '../../outputs/output.jsx';
import { linkIcon } from "../../../svgs/svg.jsx";
import { linkHandler } from '../../../myFunctions/goftarLinkFuncs';
import '../../../styles/Goftar/TabContents/LinkContent.css';
import {linkApi} from '../../../api/Api.jsx';
import Loader from "../../Loader.jsx";

const LinkContent = ({langSelect}) => {
  const [isFetch, setIsFetch] = useState(false);
  const [startFetch, setStartFetch] = useState(false);
  const [paused, setPaused] = useState(true);
  const [linkValue, setLinkValue] = useState("");
  const audioRef = useRef(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [text, setText] = useState([
    { start: "0:00:00", end: "0:00:00", text: "" },
  ]);
  const notify = (value) => toast.error(value);


  const linkHandleClick = () => {
    linkHandler({ linkValue, notify });

    linkValue !== "" &&
      linkApi({
        setAudioDuration,
        setStartFetch,
        setIsFetch,
        notify,
        linkValue,
        setText,
        langSelect,
      });
  };

  return (
    <div className="goftar-link">
      {/*link input alerts */}
      <audio
        id="audio"
        preload="none"
        ref={audioRef}
        style={{ display: "none" }}
        onContextMenu={() => false}
        onEnded={() => setPaused(true)}
        hidden
        src={linkValue}
      ></audio>
      {isFetch ? (
        //output - after fetch
        <div className="goftar-link-fetch">
          <Output
            setPaused={setPaused}
            paused={paused}
            audioRef={audioRef && audioRef}
            text={text}
            currentTab={"link"}
            duration={audioDuration}
            language={langSelect}
            setIsFetch={setIsFetch}
          />
        </div>
      ) :
      startFetch ? (
        <Loader />
        ) : (
        // output - before fetch
        <motion.div
          className="goftar-link-prefetch"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className="link-container">
            <div className="link-icon-container" onClick={linkHandleClick}>
              {linkIcon}
            </div>
            <input
              type="text"
              placeholder="example.com/sample.mp3"
              className="link-input"
              value={linkValue}
              onChange={(event) => setLinkValue(event.target.value)}
            />
          </div>
          <span className="link-text">
            نشانی اینترنتی فایل حاوی گفتار (صوتی/تصویری) را وارد و دکمه را فشار
            دهید
          </span>
          <div id='loader'>
            <span id='progress'></span>
          </div>
        </motion.div>
      )}

    </div>
  );
};

export default LinkContent;