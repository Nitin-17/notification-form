import { ErrorMessage } from "formik";

const FileUploadInput = ({ setFieldValue, handleFileInputChange }) => {
  return (
    <div>
      <input
        type="file"
        name="file"
        onChange={(e) => handleFileInputChange(e, setFieldValue)}
      />
      <ErrorMessage name="file" component="div" className="error" />
    </div>
  );
};

export default FileUploadInput;
