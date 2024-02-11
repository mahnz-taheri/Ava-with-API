import { useEffect, useState } from "react";
import { formatDuration } from "../../myFunctions/filesFuncsArchive";
import '../../styles/outputs/timedText.css';

const TimedText = ({ timeText, paused, audioRef }) => {
  const [timeTextArray, setTimeTextArray] = useState(timeText);

  const isEven = (num) => num % 2 === 0;

  const scrollToElement = (elementId) => {
    const element = document.querySelector(`#${elementId}`);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  // handle active time off text
  useEffect(() => {
    if (!paused) {
      scrollToElement("active");
      const audioElement = document.getElementById("audio");

      const updateCurrentTime = () => {
        const currentAudioRef = audioRef?.current;
        const currentAudioTime = currentAudioRef
          ? currentAudioRef.currentTime
          : audioElement.currentTime;

        const updateArray = timeTextArray.map((t) => {
          if (t.from <= currentAudioTime && t.to >= currentAudioTime) {
            return { ...t, active: true };
          } else {
            return { ...t, active: false };
          }
        });
        setTimeTextArray(updateArray);
      };
      
      const intervalId = setInterval(updateCurrentTime, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [paused, timeTextArray, audioRef]);

  return (
    <div className="contain-time-text">
      {timeTextArray.map((t) => {
        return (
          <div
            key={t.id}
            className={isEven(t.id) ? "time-text" : "odd-time-text"}
            style={t.active ? { color: "#118ad3" } : {}}
            id={t.active ? "active" : "not-active"}
          >
            <span className="to-time">{formatDuration(t.to)}</span>
            <span className="from-time">{formatDuration(t.from)}</span>
            <span className="text">{t.text}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TimedText;