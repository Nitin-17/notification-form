import * as Yup from "yup";

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
