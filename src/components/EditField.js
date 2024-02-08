import React, { useState, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditField = ({ setEditorValue }) => {
  const [value, setValue] = useState("");
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
    //setTextValue(editor.getText().trim());
    // Create a new DOMParser
    const parser = new DOMParser();

    // Parse the text as XML
    const xmlDoc = parser.parseFromString(content, "text/html");

    // Get the HTML document
    const htmlDoc = xmlDoc.documentElement;

    // Log the HTML document
    //console.log(htmlDoc);
    /*  console.log("content", content);
    // Serialize the HTML document to a string
    const htmlString = new XMLSerializer().serializeToString(htmlDoc);

    // Open a new window and set its content to the HTML document
    const newWindow = window.open();
    newWindow.document.write(htmlString); */
    setEditorHtml(content);
    setEditorValue(htmlDoc);
  };

  return (
    <ReactQuill
      theme="snow" // or 'bubble'
      value={editorHtml}
      onChange={handleEditorChange}
      modules={modules}
      formats={formats}
    />
  );
};

export default EditField;
