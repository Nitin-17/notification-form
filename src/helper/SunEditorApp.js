import React, { useRef, useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { getCurrentDate } from "../helper/utils";
import {
  align,
  font,
  fontColor,
  fontSize,
  formatBlock,
  hiliteColor,
  horizontalRule,
  lineHeight,
  list,
  paragraphStyle,
  table,
  template,
  textStyle,
  image,
  link,
} from "suneditor/src/plugins";

const SunEditorApp = (props) => {
  console.log("props", props);
  const { setFieldValue } = props;
  const sunEditorRef = useRef(null);
  const [value, setValue] = useState(null);

  const handleEditorChange = (content) => {
    setValue(content);
  };

  const sendValue = () => {
    console.log(value); // Directly use value here
    console.log("called");
    setFieldValue("file", value);
    const type = "html";
    setFieldValue("type", type);
    setFieldValue("date", getCurrentDate());
  };

  return (
    <div className="App">
      <h1>Suneditor Demo</h1>
      <SunEditor
        //ref={sunEditorRef}
        setOptions={{
          height: 200,
          plugins: [
            align,
            font,
            fontColor,
            fontSize,
            formatBlock,
            hiliteColor,
            horizontalRule,
            lineHeight,
            list,
            paragraphStyle,
            table,
            template,
            textStyle,
            image,
            link,
          ],
          buttonList: [
            ["undo", "redo"],
            ["font", "fontSize", "formatBlock"],
            ["paragraphStyle", "blockquote"],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
            ],
            ["fontColor", "hiliteColor", "textStyle"],
            ["removeFormat"],
            "/", // Line break
            ["outdent", "indent"],
            ["align", "horizontalRule", "list", "lineHeight"],
            [
              "table",
              "link",
              "image",
              "video",
              "fullScreen",
              "showBlocks",
              "codeView",
            ],
            ["preview", "print"],
            ["save", "template"],
          ],
        }}
        onChange={(e) => handleEditorChange(e, setFieldValue)}
      />
      <button type="button" onClick={sendValue}>
        Submit
      </button>
    </div>
  );
};

export default SunEditorApp;
