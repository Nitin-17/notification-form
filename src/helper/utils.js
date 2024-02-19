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

function dataURItoBlob(dataURI) {
  // Extract the base64 data from the data URI
  const base64Data = dataURI.split(",")[1];

  // Convert the base64 data to binary data
  const byteString = atob(base64Data);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }

  // Create a Blob object from the binary data
  const blob = new Blob([int8Array], { type: "application/pdf" });
  console.log("blob", blob);
  return blob;
}
// data should be your response data in base64 format

export const viewHtml = (htmlDoc, type) => {
  console.log("HtmlDoc", htmlDoc, type);

  /*const newWindow = window.open();
  newWindow.document.write(htmlDoc); */
  //const blob = dataURItoBlob(htmlDoc);
  // const url = URL.createObjectURL(blob);
  // window.open(url, "_blank");
  if (type === "pdf" || type === "doc") {
    const newWindow = window.open();
    newWindow.document.write(
      `<embed width="100%" height="100%" src="${htmlDoc}" type="application/pdf" />`
    );
  } else {
    const newWindow = window.open("", "_blank");
    newWindow.document.open();
    newWindow.document.write(htmlDoc);
    newWindow.document.close();
  }
};

/* File Upload  */
export const checkFileFormat = (file) => {
  const filesFormats = [".doc", ".docx", "application/pdf"];
  const isRightFormat = filesFormats.includes(file.type);
  console.log(isRightFormat);
  if (!isRightFormat) {
    alert("You can only upload pdf and doc files");
    return false;
  }
  return true;
};

/* File Type Function */
export const checkFileType = (file) => {
  const docFiles = [".doc", ".docx"];
  // const pdfFiles = ["application/pdf"];
  const fileType = docFiles.includes(file.type) ? "doc" : "pdf";
  return fileType;
};
