import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getBase64, validationSchema } from "../helper/utils";
import FileUploadInput from "./FileUploadInput";
import EditField from "./EditField";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [base64URL, setBase64URL] = useState("");
  const [editorValue, setEditorValue] = useState(null);

  const handleFileInputChange = (e, setFieldValue) => {
    let selectedFile = e.target.files[0];
    //console.log("File type:", selectedFile.type);

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

  const handleSubmit = (values, actions) => {
    console.log("values", values, "actions", actions);
    const param = {
      name: values.name,
      description: values.description,
      option: values.option,
      //file: editorValue ? editorValue : values.file,
      file: values.option === "upload" ? values.file : editorValue,
    };
    console.log("Params", param);
    actions.resetForm();
  };

  return (
    <>
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
          handleSubmit(values);
          /*    setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400); */
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
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
            {values.option === "upload" ? (
              <FileUploadInput
                setFieldValue={setFieldValue}
                handleFileInputChange={handleFileInputChange}
              />
            ) : (
              <EditField setEditorValue={setEditorValue} />
            )}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      <h1>Hello</h1>
    </>
  );
};

export default FileUpload;
