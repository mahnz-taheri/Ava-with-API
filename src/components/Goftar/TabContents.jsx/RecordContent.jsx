import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { recordMic } from "../../../svgs/svg.jsx";
import { StopCircleOutlined } from "@mui/icons-material";
import Output from '../../outputs/output.jsx';
import {handleStartRecording, handleStopRecording,} from "../../../myFunctions/goftarRecordFuncs.jsx";
import '../../../styles/Goftar/TabContents/RecordContent.css';
import { recordApi } from "../../../api/Api.jsx";
import  useWebSocket, { ReadyState } from "react-use-websocket";
import Loader from "../../Loader.jsx";


const RecordContent = ({langSelect}) => {
  const [isFetch, setIsFetch] = useState(false);
  const [paused, setPaused] = useState(true);
  const [startFetch, setStartFetch] = useState(false)
  const audioRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState("");
  const [file, setFile] = useState(undefined);
  const [text, setText] = useState([
    { start: "0:00:00", end: "0:00:00", text: "" },
  ]);
  const notify = (value) => toast.error(value);
 
  // websocket
  const options = {
    onOpen: () => {
      console.log("WebSocket connection opened");
    },
    onClose: () => {
      console.log("WebSocket connection closed");
    },
  };
  const url = "wss://harf.roshan-ai.ir/ws_api/transcribe_files/";
  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket(
    url,
    options
  );

  // convert audio blob to arraybuffer
  function convertBlobToArrayBuffer(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error("Unable to convert blob to ArrayBuffer."));
      };

      reader.readAsArrayBuffer(blob);
    });
  }

   // get arraybuffer
   async function handleAudioBlob(blob) {
    try {
      const arrayBuffer = await convertBlobToArrayBuffer(blob);
      if (arrayBuffer) {
        console.log(arrayBuffer);
        sendJsonMessage(arrayBuffer);
      }
    } catch (error) {
      console.error(error);
    }
  }


  // run record api when file selected - record api
  useEffect(() => {
    if (file) {
      recordApi({
        setDuration,
        setStartFetch,
        setIsFetch,
        setText,
        notify,
        langSelect,
        file,
      });

      // handle websocket
      if (readyState === ReadyState.OPEN) {
        handleAudioBlob(file);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  useEffect(() => {
    if (lastJsonMessage) {
      // Handle the response accordingly
      console.log("response:", lastJsonMessage);
    } else {
      console.log(lastJsonMessage);
    }
  }, [lastJsonMessage]);

  // voice record handler
  useEffect(() => {
    if (isRecording) {
      handleStartRecording({
        mediaRecorderRef,
        setAudioUrl,
        setFile,
      });
    } else {
      handleStopRecording({ mediaRecorderRef });
    }
  }, [isRecording]);

 
  return (
    <div className="record">
      <audio
        id="audio"
        preload="none"
        ref={audioRef}
        style={{ display: "none" }} 
        onContextMenu={() => false}
        onEnded={() => setPaused(true)}
        hidden
        src={audioUrl}
      ></audio>
      {isFetch ? (
        // output  after fetch
        <div className="f-record">
          <Output
            setPaused={setPaused}
            paused={paused}
            audioRef={audioRef && audioRef}
            text={text}
            currentTab={"record"}
            duration={duration}
            language={langSelect}
            setIsFetch={setIsFetch}
          />
        </div>
      ) : // home ai content output - before fetch from server
      startFetch ? (
        <Loader />
      ) : (
        // output  before fetch 
        <motion.div
          className="pref-record"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <div className='record'>
            {/* stope record */}
            {isRecording && (
              <div className='stopIcon' onClick={() => setIsRecording(false)}>
                <StopCircleOutlined fontSize='large' />
              </div>
            )}
            {/* start record */}
            <div
              className={`record-icon${
                isRecording && "-change"
              }`}
              onClick={() => setIsRecording(true)}>
              {/* record mic icon */}
              {recordMic}
            </div>
          </div>
         {/* <div
            className={`record-icon ${
              isRecording && "-change-record-icon"
            }`}
            onClick={recordHandler}
          >
            {recordMic}
          </div>*/}
          <span className="record-txt">
            برای شروع به صحبت، دکمه را فشار دهید متن پیاده شده آن، در اینجا ظاهر
            شود
          </span>
        </motion.div>
      )}      
    </div>
  );
};

export default RecordContent;