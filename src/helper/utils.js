import * as Yup from "yup";
import jsPDF from "jspdf";

export const getBase64 = (file) => {
  console.log("File is", file);
  return new Promise((resolve) => {
    let reader = new FileReader();
    console.log("reader result", reader);
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const base64 = arrayBufferToBase64(reader.result);
      resolve(base64);
    };
  });
};

const arrayBufferToBase64 = (arrayBuffer) => {
  console.log("Array Buffer", arrayBuffer);
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

const getBase64FromUrl = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      resolve(reader.result);
    };
    reader.onerror = reject;
  });
};

export const viewHtml = async (htmlDoc, type = "pdf") => {
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
  } else if (type === "html") {
    /* else if (type === "html") {
    const htmlBase64 = htmlDoc;

    // Decode the Base64 encoded HTML string
    const decodedHtml = window.atob(decodeURIComponent(htmlBase64));

    // Create a new jsPDF instance
    const pdfDoc = new jsPDF();

    // Set font and text size
    // pdfDoc.setFont("helvetica");
    pdfDoc.setFontSize(12);

    // Add HTML content to the PDF document
    pdfDoc.html(decodedHtml, {
      callback: (pdf) => {
        // Save the PDF as Blob
        const pdfBlob = pdf.output("blob");

        // Create URL for the Blob
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Open the PDF in a new tab
        window.open(pdfUrl, "_blank");
      },
    });
  } */

    const imgSrcs = [];
    const imgRegex = /<img[^>]+src="?([^"\s]+)"?[^>]*>/g;

    let match;
    while ((match = imgRegex.exec(htmlDoc)) !== null) {
      imgSrcs.push(match[1]);
    }

    console.log("images", imgSrcs);

    var doc = new jsPDF();
    let string = "<p>Hello There</p>";

    doc.setFontSize(40);
    //doc.text(htmlDoc, 15, 15);
    doc.text(35, 25, string);
    if (imgSrcs.length > 0) {
      doc.addImage(imgSrcs[0], "JPEG", 15, 40, 180, 180);
    }

    const pdfBlob = doc.output("blob");

    // Create URL for the Blob
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new tab
    window.open(pdfUrl, "_blank");

    /* const pdf = new jsPDF();
    const specialElementHandlers = {
      "#editor": (element, renderer) => {
        return true;
      },
    };

    pdf.fromHTML(
      htmlDoc,
      15,
      15,
      {
        width: 170,
        elementHandlers: specialElementHandlers,
      },
      () => {
        const pdfBlob = pdf.output("blob");

        // Create URL for the Blob
        const pdfUrl = URL.createObjectURL(pdfBlob);

        // Open the PDF in a new tab
        window.open(pdfUrl, "_blank");
      }
    ); */
  } else {
    const newWindow = window.open("", "_blank");
    newWindow.document.open();
    newWindow.document.write(htmlDoc);
    newWindow.document.close();
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
