export const restartHandler = ({
    setIsFetch,
    setPaused,
    audioRef,
  }) => {
    setIsFetch && setIsFetch(false);
    setPaused(true);
    audioRef.current?.pause();
  };
  
  export const formatDuration = (value) => {
    const hour = Math.floor(value / 3600);
    const minute = Math.floor((value - hour * 3600) / 60);
    const secondLeft = value - (minute * 60 + hour * 3600);
    return `${hour !== 0 ? hour + ":" : ""}${
      minute === 0 ? "0" + minute : minute
    }:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  };
  
  // covert string time to seconds
  export const convertDatetimeToDate = (datetime) => {
    const dateObj = new Date(datetime);
    const year = dateObj.getUTCFullYear() - 621;
    const month = dateObj.getUTCMonth() + 1;
    const day = dateObj.getUTCDate();
    return `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
  };
  
  // format audio duration - string mode
  export const formatDurationTextTime = (time) => {
    const timeComponents = time.split(":");
    const hours = parseInt(timeComponents[0]);
    const minutes = parseInt(timeComponents[1]);
    const seconds = parseInt(timeComponents[2]);
  
    let convertedTime;
    if (hours === 0) {
      convertedTime = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    } else {
      convertedTime = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
  
    return convertedTime;
  };
  
  // covert string time to seconds
  export const convertSecond = (time) => {
    const timeComponents = time.split(":");
    const hours = parseInt(timeComponents[0]);
    const minutes = parseInt(timeComponents[1]);
    const seconds = parseInt(timeComponents[2]);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  
    return totalSeconds;
  };
  
  // copy text handler
  export const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  
  // copy tooltip handlers
  export const tooltipCloseHandler = ({ setOpen }) => {
    setOpen(false);
  };
  export const tooltipOpenHandler = ({ setOpen }) => {
    setOpen(true);
  };
  
  // delete file handler
  export const deleteHandler = ({ files, setFiles, audioRef, item }) => {
    const filesUpdate = {
      ...files,
      results: files.results.filter((file) => file.id !== item.id),
    };
  
    setFiles(filesUpdate);
    audioRef.current && audioRef.current.pause();
  };
  
  // download audio handler
  export const downloadHandler = ({
    audioUrl,
    audioRef,
  }) => {
    const link = document.createElement("a");
    link.href = audioUrl || audioRef?.current?.src || "";
    link.download = "audio.mp3";
    link.click();
  };