export const handleStartRecording = ({
  mediaRecorderRef,
  setAudioUrl,
  setFile,
}) => {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      const recordedChunks = [];
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.addEventListener("dataavailable", (event) => {
        recordedChunks.push(event.data);
      });

      mediaRecorder.start();

      mediaRecorder.onstop = function () {
        const audioBlob = new Blob(recordedChunks, {
          type: "audio/webm;codecs=opus",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setFile(audioBlob);
        setAudioUrl(audioUrl);
      };
    })
    .catch((error) => {
      console.error("Error accessing microphone:", error);
      alert("no access to microphone");
    });
};

export const handleStopRecording = ({
  mediaRecorderRef,
}) => {
  mediaRecorderRef.current?.stop();
};