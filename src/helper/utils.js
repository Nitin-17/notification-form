import * as Yup from "yup";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import htmlToPdfmake from "html-to-pdfmake";
const pdfMake = require("pdfmake/build/pdfmake");
const pdfFonts = require("pdfmake/build/vfs_fonts");

// Register the fonts
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const getBase64 = (file) => {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const base64 = arrayBufferToBase64(reader.result);
      resolve(base64);
    };
  });
};

const arrayBufferToBase64 = (arrayBuffer) => {
  const binaryArray = new Uint8Array(arrayBuffer);
  let base64 = "";
  for (let i = 0; i < binaryArray.length; i++) {
    base64 += String.fromCharCode(binaryArray[i]);
  }
  return btoa(base64);
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  file: Yup.mixed().required("Please select a file"),
});

export const htmlValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  file: Yup.mixed().required("Please enter valid content"),
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

/* function dataURItoBlob(dataURI) {
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
} */
// data should be your response data in base64 format

function base64ToBlob(base64, type = "application/octet-stream") {
  const binStr = atob(base64);
  const len = binStr.length;
  const arr = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    arr[i] = binStr.charCodeAt(i);
  }
  return new Blob([arr], { type: type });
}

export const viewHtml = async (htmlDoc, type) => {
  //console.log("HtmlDoc", htmlDoc, type);

  if (type === "pdf") {
    const blob = base64ToBlob(htmlDoc, "application/pdf");
    const url = URL.createObjectURL(blob);
    const pdfWindow = window.open("");
    pdfWindow.document.write(
      "<iframe width='100%' height='100%' src='" + url + "'></iframe>"
    );
  } else if (type === "doc") {
    // Convert Base64 string to Uint8Array
    const byteCharacters = atob(htmlDoc);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Create Blob from Uint8Array
    const blob = new Blob([byteArray], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    // Create a temporary link and trigger download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "example.docx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    console.log("called");
    /*    var doc = new jsPDF();

    // We'll make our own renderer to skip this editor
    var specialElementHandlers = {
      "#editor": function (element, renderer) {
        return true;
      },
    };

    // All units are in the set measurement for the document
    // This can be changed to "pt" (points), "mm" (Default), "cm", "in"
    doc.fromHTML(htmlDoc, 15, 15, {
      width: 170,
      elementHandlers: specialElementHandlers,
    }); */

    /*     var doc = new jsPDF();
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlDoc;
    console.log("htmldoccccc", tempElement);

    // Assuming "container" is an ID, use "#" to select it
    const input = tempElement.querySelector("#container");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    }); */

    const domParser = new DOMParser();
    const htmlDocc = domParser.parseFromString(htmlDoc, "text/html");

    const paragraphs = Array.from(htmlDocc.querySelectorAll("p"));
    const images = Array.from(htmlDocc.querySelectorAll("img")).map(
      (img) => img.src
    );
    const listItems = Array.from(htmlDocc.querySelectorAll("li"));

    // Map paragraphs to pdfmake elements
    const pdfContent = paragraphs.map((paragraph) => {
      return {
        text: paragraph.innerText,
        margin: [0, 0, 0, 10], // top, right, bottom, left
      };
    });

    // Map images to pdfmake image objects
    const pdfImages = images.map((image) => {
      return { image, width: 400, margin: [0, 10] }; // specify width and margin as needed
    });

    // Map list items to pdfmake list objects
    const pdfListItems = listItems.map((listItem) => {
      return listItem.innerText;
    });

    // Define the document definition based on the PDF content
    const documentDefinition = {
      content: [
        // Construct the document content using pdfmake structure
        { text: "PDF Content extracted from HTML string", style: "header" },
        ...pdfContent,
        ...pdfImages,
        { ul: pdfListItems }, // create a list from the list items
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10], // top, right, bottom, left
        },
      },
    };

    // Create the PDF
    const pdfDoc = pdfMake.createPdf(documentDefinition);

    // Download the PDF
    pdfDoc.download("your_pdf_filename.pdf");
  }
};

/* File Upload  */
export const checkFileFormat = (file) => {
  const filesFormats = [
    ".doc",
    ".docx",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const isRightFormat = filesFormats.includes(file.type);
  //console.log(isRightFormat);
  if (!isRightFormat) {
    alert("You can only upload pdf and doc files");
    return false;
  }
  return true;
};

/* File Type Function */
export const checkFileType = (file) => {
  console.log("FileType inside utils", file);
  /* const docFiles = [".doc", ".docx", ".document"];
   const pdfFiles = ["application/pdf"]; */
  const fileType = file.type.includes(".document") ? "doc" : "pdf";
  return fileType;
};

// Current Date
export const getCurrentDate = () => {
  const d = new Date();
  return `${d.getDate()} ${
    [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ][d.getMonth()]
  } ${d.getFullYear()}`;
};

export const emptySchema = Yup.object().shape({});
