import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import {
  getBase64,
  validationSchema,
  checkFileFormat,
  checkFileType,
  getCurrentDate,
  htmlValidationSchema,
  emptySchema,
} from "../helper/utils";
import FileUploadInput from "./FileUploadInput";
import EditField from "./EditField";
import { addFormData } from "../features/listSlice";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [base64URL, setBase64URL] = useState("");
  const [editorValue, setEditorValue] = useState(null);
  const [list, setList] = useState();
  const [isSubmittedForm, setIsSubmittedForm] = useState(false);
  const [selectedOption, setSelectedOption] = useState("upload");
  const dispatch = useDispatch();

  const handleFileInputChange = (e, setFieldValue) => {
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
    console.log("called");
  };

  const handleSubmit = async (values, actions) => {
    console.log("Values", values);
    if (values.option !== "edit") {
      const fileType = checkFileType(values.file);
      const isRightType = checkFileFormat(values.file);
      console.log("File Type is", fileType);

      if (isRightType) {
        const param = {
          name: values.name,
          description: values.description,
          option: values.option,
          file: values.option === "upload" ? values.file : editorValue,
          type: fileType,
          date: getCurrentDate(),
        };
        dispatch(addFormData(param));
        setList(param.file);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        actions.resetForm();
        setIsSubmittedForm(true);
      }
    } else {
      dispatch(addFormData(values));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      actions.resetForm();
    }
  };

  console.log("state changed", selectedOption);

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
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
        }}
      >
        {({ isSubmitting, resetForm, setFieldValue, values }) => (
          <Form>
            <div className="flex flex-col gap-4 justify-center items-center">
              {/* ---------- */}

              {}

              <div className="flex flex-col justify-center items-center gap-2 mt-4">
                <div className="flex flex-row justify-center items-center gap-2 mt-4">
                  <label htmlFor="name">Name</label>
                  <Field
                    type="text"
                    name="name"
                    className="mt-1 w-40 h-8 rounded-md border border-gray-200 shadow-sm sm:text-sm py-2"
                  />
                </div>
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error text-red-500"
                />
                <div className="flex flex-row justify-center items-center gap-2 mt-2">
                  <label htmlFor="description">Description</label>
                  <Field
                    type="text"
                    name="description"
                    className="mt-1 w-40 h-8 rounded-md border border-gray-200 shadow-sm sm:text-sm py-2"
                  />
                </div>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error text-red-500"
                />
              </div>

              {/* ------------- */}
              <div className="flex flex-row gap-4">
                <label>
                  <Field
                    type="radio"
                    name="option"
                    value="upload"
                    checked={selectedOption === "upload"}
                    onChange={() => {
                      setSelectedOption("upload");
                      resetForm();
                    }}
                  />
                  Upload
                </label>
                <label>
                  <Field
                    type="radio"
                    name="option"
                    value="edit"
                    checked={selectedOption === "edit"}
                    onChange={() => {
                      setSelectedOption("edit");
                      resetForm();
                    }}
                  />
                  Edit
                </label>
              </div>
              <div className="flex flex-row justify-center items-center">
                {selectedOption === "upload" ? (
                  <FileUploadInput
                    setFieldValue={setFieldValue}
                    handleFileInputChange={handleFileInputChange}
                    isSubmittedForm={isSubmittedForm}
                    setIsSubmittedForm={setIsSubmittedForm}
                  />
                ) : (
                  <EditField
                    setFieldValue={setFieldValue}
                    handleEditInputChange={handleEditInputChange}
                  />
                )}
              </div>
              <button
                type="submit"
                className="w-32 rounded-full bg-cyan-400 border-2 p-3 text-lg"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default FileUpload;
