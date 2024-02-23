import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getCurrentDate } from "../helper/utils";
import { ErrorMessage } from "formik";

const EditField = ({ setFieldValue, handleEditInputChange }) => {
  const [editorHtml, setEditorHtml] = useState();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const handleEditorChange = (content) => {
    setEditorHtml(content);
    const newHtmlDocument = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title></title>\n</head>\n<body>\n${content}\n</body>\n</html>`;
    setFieldValue("file", content);
    const type = "html";
    setFieldValue("type", type);
    setFieldValue("date", getCurrentDate());
    handleEditInputChange(newHtmlDocument);
  };

  return (
    <>
      <ReactQuill
        theme="snow" // or 'bubble'
        value={editorHtml}
        onChange={(e) => handleEditorChange(e, setFieldValue)}
        modules={modules}
        formats={formats}
        id="react-quill-id"
      />
      <ErrorMessage
        name="file"
        component="div"
        className="error text-red-500"
      />
    </>
  );
};

export default EditField;
