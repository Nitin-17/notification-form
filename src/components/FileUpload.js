import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getBase64, validationSchema } from "../helper/utils";
import FileUploadInput from "./FileUploadInput";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [base64URL, setBase64URL] = useState("");

  const handleFileInputChange = (e, setFieldValue) => {
    let selectedFile = e.target.files[0];
    console.log("File type:", selectedFile.type);

    getBase64(selectedFile)
      .then((result) => {
        selectedFile["base64"] = result;
        setFile(selectedFile);
        setBase64URL(result);
        setFieldValue("file", selectedFile);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        option: "upload",
        file: null,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Field type="text" name="description" />
            <ErrorMessage
              name="description"
              component="div"
              className="error"
            />
          </div>
          <div>
            <label>
              <Field type="radio" name="option" value="upload" />
              Upload
            </label>
            <label>
              <Field type="radio" name="option" value="edit" />
              Edit
            </label>
          </div>
          <FileUploadInput
            handleFileInputChange={handleFileInputChange}
            setFieldValue={setFieldValue}
          />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FileUpload;
