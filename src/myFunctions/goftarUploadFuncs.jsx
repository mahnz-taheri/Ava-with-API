export const fileHandler = ({
    event,
    setFile,
    setFilePath,
  }) => {
    setFile(event.target.files?.[0]);
    const files = event.target.files;
    if (files && files.length > 0) {
      const filePath = URL.createObjectURL(files[0]);
      setFilePath(filePath);
    }
  };