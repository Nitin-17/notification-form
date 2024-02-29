import * as Yup from "yup";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import htmlToPdfmake from "html-to-pdfmake";
import html2pdf from "html2pdf.js";
//import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

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

    /*     var pageSource = document.implementation.createHTMLDocument("New Document");

    // Set the HTML content
    pageSource.documentElement.innerHTML = htmlDoc;

    // Return the HTML source
    console.log(pageSource.documentElement.outerHTML);

    const newWindow = window.open("", "_blank");
    newWindow.document.open();
    newWindow.document.write(htmlDoc);
    newWindow.document.close(); */

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

    /* var generatedSource = new XMLSerializer().serializeToString(htmlDoc);
    console.log("xml", generatedSource); */

    console.log("htmlDocccc", htmlDoc);
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlDoc;
    //document.body.appendChild(tempElement);
    /*  tempElement.setAttribute("id", "container");
    console.log(tempElement); */
    console.log("tempelement", tempElement);

    //const input = document.querySelector("#container");
    //console.log(input);
    /*     html2canvas(tempElement, {}).then((canvas) => {
      var imgData = canvas.toDataURL("image/png");
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      var doc = new jsPDF("p", "mm");
      var position = 0;

      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      //doc.save("download.pdf");
      window.open(doc.output("bloburl"));
    }); */

    /* var pdf = new jsPDF("p", "mm");

    pdf.fromHTML(tempElement, {
      callback: function (doc) {
        // Save the PDF
        doc.save("document-html.pdf");
      },
      margin: [10, 10, 10, 10],
      autoPaging: "text",
      x: 0,
      y: 0,
      width: 190, //target width in the PDF document
      windowWidth: 675, //window width in CSS pixels
    });
    window.open(pdf.output("bloburl")); */

    /* html2canvas(tempElement, {
      useCORS: true,
      allowTaint: true,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      const image = canvas.toDataURL("image/jpeg", 1.0);
      const doc = new jsPDF("p", "px", "a4");
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const widthRatio = pageWidth / canvas.width;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
      const canvasWidth = canvas.width * ratio;
      const canvasHeight = canvas.height * ratio;
      const marginX = (pageWidth - canvasWidth) / 2;
      const marginY = (pageHeight - canvasHeight) / 2;
      doc.addImage(image, "JPEG", marginX, marginY, canvasWidth, canvasHeight);
      window.open(doc.output("bloburl"));
    }); */

    /* 
    pdf.fromHTML(tempElement, {
      callback: function (doc) {
        // Save the PDF
        console.log("callback");
        doc.save("document-html.pdf");
      },
      margin: [10, 10, 10, 10],
      autoPaging: "text",
      x: 10,
      y: 10,
      width: 190, //target width in the PDF document
      height: 200,
      windowWidth: 675, //window width in CSS pixels
    });
    window.open(pdf.output("bloburl")); */
    /*     let options = {
      orientation: "p",
      unit: "cm",
      format: "a4",
      putOnlyUsedFonts: true,
      autoPaging: "text",
    }; */

    /*     var pdf = new jsPDF("p", "pt", "a4");

    let margin = {
      top: 150,
      right: 10,
      bottom: 150,
      left: 2,
      width: 500,
      pagesplit: true,
      autoPaging: "text",
      image: { type: "jpeg", quality: 0.98 },
    };

    pdf.fromHTML(tempElement, 50, 20, margin, function (bla) {
      window.open(pdf.output("bloburl"));
    }); */

    /*  var pdf = new jsPDF("p", "pt", "a4");
    window.html2canvas = html2canvas;

    let options = {
      width: 500,
      pagesplit: true,
      autoPaging: "text",
      image: { type: "jpeg", quality: 0.98 },
    };

     pdf.html(htmlDoc, {
      callback: function (bla) {
        window.open(pdf.output("bloburl"));
      },
      image: { type: "jpeg", quality: 0.98 },
    }); 
    //pdf.html(htmlDoc).then(() => pdf.save("test.pdf")); */

    //-------------------------
    /* var opt = {
      margin: 1,
      filename: "myfile.pdf",
      image: { type: "jpeg", quality: 0.98 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(tempElement).save(); */

    //-------------------------
    /* let title = "example.pdf";

    let mywindow = window.open(
      "",
      "PRINT",
      "height=650,width=900,top=100,left=150"
    );

    mywindow.document.write(`<html><head><title>${title}</title>`);
    mywindow.document.write("</head><body >");
    mywindow.document.write(htmlDoc);
    mywindow.document.write("</body></html>");

    mywindow.document.close();
    mywindow.focus(); 

    mywindow.print();
    mywindow.addEventListener("afterprint", () => mywindow.close()); */

    //-----------------------

    // Source HTMLElement or a string containing HTML.
    //var elementHTML = document.querySelector("#contentToPrint");

    //old version
    /*     var pdf = new jsPDF("p", "mm", "a4");
    pdf.fromHTML(
      htmlDoc,
      10,
      10,
      {
        putOnlyUsedFonts: true,
        margin: [10, 10, 10, 10],
        autoPaging: "text",
        x: 0,
        y: 0,
        width: 190, //target width in the PDF document
        windowWidth: 675, //window width in CSS pixels
        pageSplit: true,
        image: { type: "jpeg", quality: 0.98, width: 100 },
      },
      function (bla) {
        const pdfBlob = pdf.output("blob");

        // Create URL for the Blob
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Open the PDF in a new tab
        window.open(pdfUrl, "_blank", "text.pdf");
      }
      //options
    ); */

    //lastest jspdf version
    /*    var doc = new jsPDF();
    doc.fromHTML(tempElement, {
      callback: function (doc) {
        // Save the PDF
        const pdfBlob = doc.output("blob");

        // Create URL for the Blob
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Open the PDF in a new tab
        window.open(pdfUrl, "_blank", "text.pdf");
      },
      putOnlyUsedFonts: true,
      margin: [10, 10, 10, 10],
      autoPaging: "text",
      x: 0,
      y: 0,
      width: 190, //target width in the PDF document
      windowWidth: 675, //window width in CSS pixels
      pagesplit: true,
      html2canvas: html2canvas.windowWidth,
      image: { type: "jpeg", quality: 0.98, width: 100, height: 100 },
    }); */

    var html = htmlToPdfmake(htmlDoc, {
      window: window,
      tableAutoSize: true,
      imagesByReference: true,
      ignoreStyles: ["font-family"],
      defaultStyles: {
        img: {
          width: 517, // Set a default width for all images
          height: 390, // Set a default height for all images
          margin: [0, 0, 0, 10], // Set margin [top, right, bottom, left] for all images
        },
        table: {
          width: [100, "*", 200, "*"],
          body: [["width=100", "star-sized", "width=200", "star-sized"]],
          //th: [{ backgroundColor: "#CCCCCC" }],
        },
        ol: {
          margin: [0, 0, 0, 4],
        },
        /*   p: {
          margin: [0, 0, 0, 0],
        }, */
      },
    });

    var dd = {
      content: [html.content],
      styles: {
        "html-image": {
          marginBottom: 10,
        },
      },
      images: html.images,
    };
    pdfMake.createPdf(dd).download();
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
