import { useState } from "react";

import SimpleText from "../../outputs/simpleText";
import TimeText from "../../outputs/timedText";
import Player from "../../outputs/player";
import '../../../styles/Archive/ArchiveContent/EachFileBottom.css';

const EachFileBottom = ({currentTab, text, timeText, paused, audioRef, lang, setPaused,}) => {
  const [activeText, setActiveText] = useState(1);

  return (
    // file output
    <div className="bottom">
      <div className="bottom-top">
        {/* time text */}
        <div
          className={
            activeText === 2
              ? "bottom-top-timed-text-active"
              : "bottom-top-timed-text"
          }
          onClick={(e) => {
            e.stopPropagation();
            setActiveText(2)}}
        >
          <div>
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
        {/* simple text */}
        <div
          className={
            activeText === 1
              ? "bottom-top-simple-text-active"
              : "bottom-top-simple-text"
          }
          onClick={(e) => {
            e.stopPropagation();
            setActiveText(1)}}
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

      <div className="bottom-output-center">
        {activeText === 1 ? (
          <SimpleText lang={lang} text={text} />
        ) : (
          <TimeText paused={paused} audioRef={audioRef} timeText={timeText} />
        )}
      </div>
      {/* voice output */}
      <div className="bottom-output-bottom">
        <Player
          setPaused={setPaused}
          paused={paused}
          currentTab={currentTab}
          audioRef={audioRef}
           // item.duration
           duration={500}
        />
      </div>
    </div>
  );
};

export default EachFileBottom;