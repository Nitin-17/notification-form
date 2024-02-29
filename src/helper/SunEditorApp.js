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
  const { setFieldValue, setSelectedOption } = props;
  const sunEditorRef = useRef(null);
  const [value, setValue] = useState(null);

  const handleEditorChange = (content) => {
    setValue(content);
    /*  console.log("content is", content);
    setFieldValue("file", value);
    const type = "html";
    setFieldValue("type", type);
    setFieldValue("date", getCurrentDate()); */
  };

  const sendValue = () => {
    console.log("value send is", value);
    setFieldValue("file", value);
    const type = "html";
    setFieldValue("type", type);
    setFieldValue("date", getCurrentDate());
    //setSelectedOption("upload");
    //handleSubmit();
    // clear editor contents
    /*   const editor = sunEditorRef?.current?.editor;
    console.log("Editor", editor);
    if (editor) {
      editor.setContents("");
    } */
  };

  const handleImageUpload = (
    targetImgElement,
    index,
    state,
    imageInfo,
    remainingFilesCount,
    files
  ) => {};

  function ResizeImage(files, uploadHandler) {
    const uploadFile = files[0];
    const img = document.createElement("img");
    const canvas = document.createElement("canvas");
    const reader = new FileReader();

    reader.onload = function (e) {
      img.src = e.target.result;
    };

    img.onload = function () {
      const MAX_WIDTH = 514;
      const MAX_HEIGHT = 400;

      // Set the canvas dimensions to the maximum width and height
      canvas.width = MAX_WIDTH;
      canvas.height = MAX_HEIGHT;

      const ctx = canvas.getContext("2d");

      // Draw the image onto the canvas, stretching it to fit
      ctx.drawImage(img, 0, 0, MAX_WIDTH, MAX_HEIGHT);

      // Convert the canvas back to a blob and pass it to the upload handler
      canvas.toBlob(
        function (blob) {
          uploadHandler([new File([blob], uploadFile.name)]);
        },
        uploadFile.type,
        1
      );
    };

    reader.readAsDataURL(uploadFile);
  }

  const handleImageUploadBefore = (files, info, uploadHandler) => {
    // uploadHandler is a function
    console.log(files, info);
    try {
      ResizeImage(files, uploadHandler);
    } catch (err) {
      uploadHandler(err.toString());
    }
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
        onImageUpload={handleImageUpload}
        onImageUploadBefore={handleImageUploadBefore}
        ref={sunEditorRef}
      />
      <button
        type="submit"
        onClick={sendValue}
        className="w-32 rounded-full bg-cyan-400 border-2 p-3 text-lg mt-4"
      >
        Submit
      </button>
    </div>
  );
};

export default SunEditorApp;
