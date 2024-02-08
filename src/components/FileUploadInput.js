import { ErrorMessage, useFormikContext } from "formik";

const FileUploadInput = ({ handleFileInputChange, setFieldValue }) => {
  const { values } = useFormikContext();

  return (
    <>
      {values.option === "upload" && (
        <div>
          <input
            type="file"
            name="file"
            onChange={(e) => handleFileInputChange(e, setFieldValue)}
          />
          <ErrorMessage name="file" component="div" className="error" />
        </div>
      )}
    </>
  );
};

export default FileUploadInput;
