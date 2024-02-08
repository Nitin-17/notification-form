import * as Yup from "yup";
import parse from "html-react-parser";

export const getBase64 = (file) => {
  return new Promise((resolve) => {
    let baseURL = "";
    let reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      baseURL = reader.result;
      resolve(baseURL);
    };
  });
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
});

/* export const createHtmlDocument = (htmlString) => { 
  const parser = new DOMParser();
  const parsedDoc = parser.parseFromString(
    `<!DOCTYPE html>
    <html>
    <head>
    <title>Page Title</title>
    </head>
    <body>${htmlString}</body>
    </html>`,
    "text/html"
  );

  return parsedDoc.documentElement.outerHTML;
}; */

export const viewHtml = (htmlDoc) => {
  console.log("Html Doc", htmlDoc);

  // Open a new window and set its content to the HTML document
  const newWindow = window.open();
  newWindow.document.write(htmlDoc);
};

/* File Upload  */
export const checkFileFormat = (file) => {
  const filesFormats = [".doc", ".docx", "application/pdf"];
  console.log(file);
  const isRightFormat = filesFormats.includes(file.type);
  console.log(isRightFormat);
  if (!isRightFormat) {
    alert("You can only upload pdf and doc files");
    return;
  }
};
