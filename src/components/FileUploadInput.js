import { ErrorMessage } from "formik";
import { useEffect, useRef } from "react";

const FileUploadInput = ({
  setFieldValue,
  handleFileInputChange,
  isSubmittedForm,
  setIsSubmittedForm,
}) => {
  const fileInputRef = useRef(null);

  useEffect(() => {
    console.log("called", isSubmittedForm);
    if (isSubmittedForm) {
      fileInputRef.current.value = ""; // Reset the value of the input field
    }
    setIsSubmittedForm(false);
  }, [isSubmittedForm]);

  return (
    <div>
      <input
        type="file"
        name="file"
        ref={fileInputRef}
        onChange={(e) => handleFileInputChange(e, setFieldValue)}
      />
      <ErrorMessage name="file" component="div" className="error" />
    </div>
  );
};

export default FileUploadInput;
