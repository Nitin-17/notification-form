import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import {
  getBase64,
  validationSchema,
  checkFileFormat,
  checkFileType,
} from "../helper/utils";
import FileUploadInput from "./FileUploadInput";
import EditField from "./EditField";
import { addFormData } from "../features/listSlice";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [base64URL, setBase64URL] = useState("");
  const [editorValue, setEditorValue] = useState(null);
  const [list, setList] = useState();
  const dispatch = useDispatch();

  const handleFileInputChange = (e, setFieldValue) => {
    console.log("seeeeeeeeeeeeeeeeee", setFieldValue);
    let selectedFile = e.target.files[0];

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

  const handleEditInputChange = (setFieldValue) => {
    // setFieldValue(null);
    //console.log("seeeeeeeeeeeeeeeeee", setFieldValue);
    //handleSubmit(setFieldValue, "html");
  };

  const handleSubmit = (values, actions) => {
    console.log("Values", values);
    if (values.option !== "edit") {
      const fileType = checkFileType(values.file);
      const isRightType = checkFileFormat(values.file);
      console.log("File Typ eis", fileType);

      if (isRightType) {
        const param = {
          name: values.name,
          description: values.description,
          option: values.option,
          file: values.option === "upload" ? values.file : editorValue,
          type: fileType,
        };
        dispatch(addFormData(param));
        setList(param.file);
        actions.resetForm();
      }
    } else {
      dispatch(addFormData(values));
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          description: "",
          option: "upload",
          file: null,
          type: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("-----------------", values);
          handleSubmit(values);
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
              <EditField
                setFieldValue={setFieldValue}
                handleEditInputChange={handleEditInputChange}
              />
            )}
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FileUpload;
