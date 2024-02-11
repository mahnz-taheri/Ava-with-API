import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tooltip, ClickAwayListener } from "@mui/material";
import Player from "./player";
import SimpleText from "./simpleText";
import TimedText from "./timedText";
import { restartIcon } from '../../svgs/svg.jsx';
import {copyToClipboard, downloadHandler, restartHandler, tooltipCloseHandler, tooltipOpenHandler,} from "../../myFunctions/filesFuncsArchive";
import '../../styles/outputs/output.css';

const Output = ({ currentTab, text, paused, audioRef, duration, language, setPaused, setIsFetch,}) => {
  const [activeText, setActiveText] = useState(1);
  const [open, setOpen] = useState(false);
  const [formattedText, setFormattedText] = useState("");

   // prepare text array to one single string - copy text
   useEffect(() => {
    let formatted_text = "";
    text.map((t) => {
      formatted_text += `${t.text} `;
    });
    setFormattedText(formatted_text);
  }, [text]);

  return (
    <motion.div
      className="output"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.3 }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <div className="output-top">
        <div className="top-left">
          <div
            className={
              currentTab === "record"
                ? "top-left-restart-record"
                : currentTab === "upload"
                ? "top-left-restart-upload"
                : currentTab === "link"
                ? "top-left-restart-link"
                : ""
            }
            onClick={() => restartHandler({ setIsFetch, setPaused, audioRef })}
          >
            <span className="top-left-restart-text">شروع دوباره</span>
            {restartIcon}
          </div>
          {/* mui copy tooltip container */}
          <ClickAwayListener
            onClickAway={() => tooltipCloseHandler({ setOpen })}
          >
            <div>
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
                      padding: "0 4px",
                      lineHeight: "auto",
                      fontSize: "14px",
                    }}
                  >
                    copied
                  </p>
                }
                placement="bottom"
                className="tooltip-copy"
              >
                {/* copy icon */}
                <svg
                  width="16"
                  height="18"
                  viewBox="0 0 16 18"
                  fill="none"
                  style={{ margin: "9px 23px 0 23px", cursor: "pointer" }}
                  onClick={() => {
                    copyToClipboard(text);
                     tooltipOpenHandler({ setOpen });
                  }}
                >
                  <path
                    d="M6.43517 17.3084H14.2768C14.6861 17.3079 15.0785 17.1308 15.3679 16.816C15.6572 16.5013 15.8199 16.0746 15.8203 15.6295V7.10304C15.8198 6.65812 15.657 6.23158 15.3677 5.91701C15.0783 5.60245 14.686 5.42557 14.2768 5.42517H6.43563C6.0265 5.42557 5.63424 5.60247 5.34495 5.91704C5.05566 6.23162 4.89297 6.65816 4.89261 7.10304V15.6295C4.89285 16.0744 5.0554 16.5011 5.3446 16.8158C5.63379 17.1306 6.026 17.3077 6.43517 17.3084ZM14.2768 6.67173C14.3821 6.67173 14.483 6.71716 14.5575 6.79803C14.6319 6.8789 14.6738 6.9886 14.6739 7.10304V15.6295C14.6739 15.7441 14.6321 15.854 14.5577 15.935C14.4832 16.0161 14.3822 16.0617 14.2768 16.0618H6.43563C6.33035 16.0616 6.22946 16.0159 6.1551 15.9348C6.08074 15.8538 6.03898 15.744 6.03898 15.6295V7.10304C6.03898 6.98865 6.08077 6.87894 6.15516 6.79806C6.22954 6.71717 6.33043 6.67173 6.43563 6.67173H14.2768Z"
                    fill="#8F8F8F"
                  />
                  <path
                    d="M1.54354 11.9886H5.46276C5.61478 11.9886 5.76058 11.9229 5.86807 11.8061C5.97556 11.6892 6.03595 11.5306 6.03595 11.3653C6.03595 11.2 5.97556 11.0415 5.86807 10.9246C5.76058 10.8077 5.61478 10.7421 5.46276 10.7421H1.54354C1.43826 10.7419 1.33732 10.6964 1.26288 10.6154C1.18843 10.5345 1.14655 10.4247 1.14643 10.3102V1.78627C1.14655 1.67183 1.18845 1.56213 1.26291 1.48126C1.33736 1.40038 1.4383 1.35496 1.54354 1.35496H9.38474C9.48998 1.35496 9.59092 1.40038 9.66538 1.48126C9.73983 1.56213 9.78173 1.67183 9.78185 1.78627V6.04851C9.78185 6.21381 9.84224 6.37235 9.94973 6.48923C10.0572 6.60612 10.203 6.67179 10.355 6.67179C10.5071 6.67179 10.6528 6.60612 10.7603 6.48923C10.8678 6.37235 10.9282 6.21381 10.9282 6.04851V1.78627C10.9277 1.34178 10.7653 0.915612 10.4764 0.601121C10.1875 0.286631 9.7958 0.109454 9.38704 0.108398H1.54354C1.13437 0.108794 0.742064 0.285681 0.452697 0.600242C0.16333 0.914804 0.000542641 1.34135 5.72205e-05 1.78627V10.3127C0.00114822 10.7573 0.164188 11.1832 0.453477 11.4973C0.742764 11.8114 1.13473 11.9881 1.54354 11.9886Z"
                    fill="#8F8F8F"
                  />
                </svg>
              </Tooltip>
            </div>
          </ClickAwayListener>
          {/* download icon */}
          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            style={{ cursor: "pointer" }}
            onClick={() => downloadHandler({ audioRef })}
          >
            <path
              d="M6.39307 10C6.32739 10.0001 6.26235 9.98485 6.20166 9.95523C6.14098 9.92561 6.08584 9.88217 6.0394 9.82739C5.99296 9.77261 5.95613 9.70757 5.93102 9.63599C5.90591 9.5644 5.89301 9.48768 5.89307 9.41021V0.58979C5.89307 0.433368 5.94574 0.283352 6.03951 0.172745C6.13328 0.0621384 6.26046 0 6.39307 0C6.52567 0 6.65285 0.0621384 6.74662 0.172745C6.84039 0.283352 6.89307 0.433368 6.89307 0.58979V9.41021C6.89307 9.56663 6.84039 9.71665 6.74662 9.82725C6.65285 9.93786 6.52567 10 6.39307 10Z"
              fill="#8F8F8F"
            />
            <path
              d="M6.60354 10.5151C6.42349 10.5154 6.24516 10.4801 6.0788 10.4112C5.91243 10.3424 5.76131 10.2414 5.63411 10.1139L2.74082 7.22064C2.6404 7.12022 2.58398 6.98402 2.58398 6.842C2.58398 6.69998 2.6404 6.56378 2.74082 6.46336C2.84125 6.36294 2.97745 6.30652 3.11947 6.30652C3.26148 6.30652 3.39769 6.36294 3.49811 6.46336L6.39139 9.35664C6.41925 9.3845 6.45233 9.4066 6.48873 9.42168C6.52513 9.43676 6.56414 9.44452 6.60354 9.44452C6.64294 9.44452 6.68195 9.43676 6.71835 9.42168C6.75475 9.4066 6.78782 9.3845 6.81568 9.35664L9.70897 6.46336C9.80998 6.36574 9.94528 6.31171 10.0857 6.31289C10.2262 6.31407 10.3606 6.37037 10.4599 6.46967C10.5593 6.56897 10.6157 6.70332 10.6169 6.84378C10.6182 6.98424 10.5642 7.11958 10.4667 7.22064L7.57297 10.1139C7.44574 10.2413 7.29461 10.3423 7.12825 10.4112C6.96189 10.48 6.78358 10.5153 6.60354 10.5151Z"
              fill="#8F8F8F"
            />
            <path
              d="M12.1319 14.5984H1.2892C0.947409 14.598 0.619735 14.4482 0.378053 14.1819C0.13637 13.9157 0.000411796 13.5547 0 13.1782V9.4333C0 9.29122 0.0512319 9.15496 0.142425 9.05449C0.233619 8.95402 0.357303 8.89758 0.48627 8.89758C0.615237 8.89758 0.738922 8.95402 0.830115 9.05449C0.921308 9.15496 0.97254 9.29122 0.97254 9.4333V13.1782C0.972643 13.2706 1.00604 13.3593 1.0654 13.4247C1.12476 13.4901 1.20525 13.5269 1.2892 13.527H12.1319C12.2158 13.5269 12.2963 13.4901 12.3557 13.4247C12.415 13.3593 12.4484 13.2706 12.4485 13.1782V9.4333C12.4485 9.29122 12.4997 9.15496 12.5909 9.05449C12.6821 8.95402 12.8058 8.89758 12.9348 8.89758C13.0638 8.89758 13.1874 8.95402 13.2786 9.05449C13.3698 9.15496 13.4211 9.29122 13.4211 9.4333V13.1782C13.4206 13.5547 13.2847 13.9157 13.043 14.1819C12.8013 14.4482 12.4736 14.598 12.1319 14.5984Z"
              fill="#8F8F8F"
            />
          </svg>
        </div>
        <div className="top-right">
          <div
            className={
              activeText === 2
                ? "top-right-time-text-active"
                : "top-right-time-text"
            }
            onClick={() => setActiveText(2)}
          >
            <div
            >
              <span>متن زمان‌بندی شده</span>
              {/* time icon */}
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path
                  d="M8.50001 16.8125C6.27938 16.8125 4.19235 15.948 2.62248 14.3775C0.0562897 11.8119 -0.553491 7.92109 1.10604 4.69703C1.25626 4.4055 1.6137 4.29091 1.90582 4.44053C2.19795 4.59016 2.31254 4.94819 2.16232 5.24031C0.739696 8.00362 1.2622 11.3381 3.46204 13.538C4.80748 14.884 6.59645 15.625 8.50001 15.625C10.403 15.625 12.1925 14.884 13.538 13.538C14.8834 12.1919 15.625 10.403 15.625 8.5C15.625 6.59644 14.884 4.80747 13.538 3.46203C12.1919 2.11659 10.4036 1.375 8.50001 1.375C6.59645 1.375 4.80748 2.11659 3.46204 3.46203C3.22988 3.69419 2.85463 3.69419 2.62248 3.46203C2.39032 3.22987 2.39032 2.85462 2.62248 2.62247C4.19235 1.05259 6.27938 0.1875 8.50001 0.1875C10.7206 0.1875 12.8083 1.05259 14.3775 2.62247C15.948 4.19234 16.8125 6.27938 16.8125 8.5C16.8125 10.72 15.948 12.8077 14.3775 14.3775C12.8083 15.948 10.7206 16.8125 8.50001 16.8125Z"
                  fill="black"
                  fillOpacity={activeText === 2 ? "1" : "0.6"}
                />
                <path
                  d="M11.4682 11.4688C11.3381 11.4688 11.2075 11.4266 11.0977 11.3387L8.12891 8.96372C7.98819 8.85091 7.90625 8.6805 7.90625 8.5V3.75C7.90625 3.42225 8.17225 3.15625 8.5 3.15625C8.82775 3.15625 9.09375 3.42225 9.09375 3.75V8.215L11.8398 10.4113C12.0957 10.6167 12.1373 10.9902 11.9325 11.2461C11.8149 11.3922 11.6427 11.4688 11.4682 11.4688Z"
                  fill="black"
                  fillOpacity={activeText === 2 ? "1" : "0.6"}
                />
              </svg>
            </div>
          </div>
          <div
            className={
              activeText === 1
                ? "top-right-simple-text-active"
                : "top-right-simple-text"
            }
            onClick={() => setActiveText(1)}
          >
            <div>
              <span>متن ساده</span>
              {/* text icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <g opacity={activeText === 1 ? "1" : "0.6"}>
                  <path
                    d="M1.47821 3.69571H15.7065"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.35858 6.92929H15.7064"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1.47821 10.163H15.7065"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.35858 13.3967H15.7064"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/*text output */}
      <div className="output-center">
        {activeText === 1 ? (
          <SimpleText language={language} text={text} />
        ) : (
          <TimedText paused={paused} timeText={text} />
        )}
      </div>
      {/*voice output */}
      <div className="output-bottom">
        <Player
          setPaused={setPaused}
          paused={paused}
          currentTab={currentTab}
          audioRef={audioRef}
          duration={duration}
        />
      </div>
    </motion.div>
  );
};

export default Output;