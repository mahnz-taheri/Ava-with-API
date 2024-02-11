import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Tooltip, ClickAwayListener } from "@mui/material";
import EachFileBottom from "./EachFileBottom";
import {linkSvg, micSvg, uploadSvg, downloadSvg, wordSvg, copySvg, deleteSvg,} from "../../../imaginaryDatas/imaginaryArchiveData.jsx";
import {copyToClipboard, deleteHandler, downloadHandler, formatDuration, tooltipCloseHandler, tooltipOpenHandler,} from "../../../myFunctions/filesFuncsArchive.jsx";
import '../../../styles/Archive/ArchiveContent/EachFile.css';
import { Style } from "@mui/icons-material";
import { deleteApi, getFileApi } from "../../../api/Api";

const EachFile = ({ item, files, setFiles, onItemClick,isopen }) => {
  const [paused, setPaused] = useState(true);
  const [open, setOpen] = useState(isopen);
  const audioRef = useRef(null);
  const EachFileRef = useRef(null);
  const aiBottomRef = useRef(null);
  const aiToolsRef = useRef(null);
  const [sendType, setSendType] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [audioType, setAudioType] = useState(null);
  const [audioName, setAudioName] = useState(null);
  const [audioLang, setAudioLang] = useState(null);
  const [formattedText, setFormattedText] = useState("");
  const [isFetch, setIsFetch] = useState(false);
  const [text, setText] = useState([
    { start: "0:00:00", end: "0:00:00", text: "" },
  ]);
  const notify = (value) => toast.error(value);
  const notifyCopy = (value) => toast.info(value);
  // change item height 
  // file click event
  /*useEffect(() => {
    const EachFile = EachFileRef?.current;
    const handleClickOutside = (event) => {
      // if (
      //   aiBottomRef.current &&
      //   !aiBottomRef.current.contains(event.target) &&
      //   aiToolsRef.current &&
      //   !aiToolsRef.current.contains(event.target)
      // ) {
      //   ;
      // }
    };
    if (isopen ) {
      setPaused(true);
      audioRef.current?.pause();
    }
    EachFile?.addEventListener("mousedown", handleClickOutside);

    return () => {
      EachFile?.removeEventListener("mousedown", handleClickOutside);
    };
  }, [item.id, onItemClick]);*/

  return (
    <div onClick={()=>onItemClick(item.id)}
      className={`each-file${isopen && "-change-file"}`}
      ref={EachFileRef} 
      style={
        item.sendType === "record" && isopen 
          ? { border: "1px solid #00ba9f" }
          : item.sendType === "link" && isopen 
          ? { border: "1px solid #ff1654" }
          : item.sendType === "upload" && isopen 
          ? { border: "1px solid #118ad3" }
          : {}
      }
    >
      {/* imaginary voice */}
      <audio
        preload="none"
        ref={audioRef}
        style={{ display: "none" }} 
        onContextMenu={() => false}
        onEnded={() => setPaused(true)}
        hidden
      >
        <source src={item.audio} type={`audio/${item.voiceType}`} />
      </audio>
      <div className="each-file-top">
        {/* file icon */}
        <div className="each-file-icon">
          <div
            className={`icon${item.sendType === "link" && "-link"}${
              item.sendType === "upload" && "-upload"
            }${item.sendType === "record" && "-record"}`}
          >
            {item.sendType === "link"
              ? linkSvg
              : item.sendType === "upload"
              ? uploadSvg
              : item.sendType === "record"
              ? micSvg
              : ""}
          </div>
        </div>
        {/* file name*/}
        <span
          className={`each-file-name${item.sendType === "link" && "-link"}`}
        >
          {item.name}
        </span>
        <span className="each-file-date">{item.createdAt}</span>
        <span className="each-file-type" style={{ fontFamily: 'Arial, sans-serif' }}>.{item.voiceType}</span>
        {/* file duration */}
        <span className="each-file-duration">
          {formatDuration(item.duration)}
        </span>
        <div className="each-file-tools" ref={aiToolsRef}>
          {/*download voice */}
          <div
            data-tooltip-id="my-tooltip"
            className="each-file-download"
            onClick={(e) => {
              e.stopPropagation();
              downloadHandler({ item })}} >
            {downloadSvg}
          </div>
          {/*download word*/}
          <div className="each-file-word"
           onClick={(e) => {
            e.stopPropagation();
            downloadHandler({ item })}} >
              {wordSvg}
          </div>
          {/* mui tooltip for copy text*/}
          <ClickAwayListener
            onClickAway={() => tooltipCloseHandler({ setOpen })}
          >
            {/*copy text */}
            <div
              className="each-file-copy"
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(item.text);
                tooltipOpenHandler({ setOpen });
              }}
            >
              {/* tooltip for copy */}
              <Tooltip
                PopperProps={{
                  disablePortal: true,
                }}
                onClose={() => tooltipCloseHandler({ setOpen })}
                open={open}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={
                  <p
                    style={{
                      padding: "0px",
                      lineHeight: "auto",
                      fontSize: "14px",
                    }}
                  >
                    copied
                  </p>
                }
                placement="bottom"
                className="copy-tooltip"
              >
                {copySvg}
              </Tooltip>
            </div>
          </ClickAwayListener>
          {/* file delete */}
          <div
            className="each-file-delete"
            onClick={() =>
              deleteHandler({
                files,
                setFiles,
                audioRef,
                item,
              })
            }
          >
            {deleteSvg}
          </div>
        </div>
      </div>
      {/* file content output*/}
      <div className="each-file-bottom" ref={aiBottomRef}>
        {isopen  && (
          <EachFileBottom
            setPaused={setPaused}
            paused={paused}
            audioRef={audioRef && audioRef}
            text={item.text}
            timeText={item.timeText}
            currentTab={item.sendType}
            lang={item.lang}
          />
        )}
      </div>
      {/* tooltip for file size when just hover */}
      <ReactTooltip
        noArrow
        id="my-tooltip"
        place="bottom-end"
        content={`${item.size} مگابایت`}
        className="tooltip"
      />
    </div>
  );
};

export default EachFile;