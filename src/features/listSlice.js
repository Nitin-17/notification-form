import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  formDataList: [
    {
      id: 1,
      name: "",
      description: "",
      option: "",
      file: null,
      type: "",
    },
  ],
};

export const formDataSlice = createSlice({
  name: "add",
  initialState,
  reducers: {
    addFormData: (state, action) => {
      //console.log("called", action);
      console.log("payload", action.payload);
      const { description, file, name, option, type } = action.payload;
      const formData = {
        id: nanoid(),
        name: name,
        description: description,
        option: option,
        file: option === "upload" ? file.base64 : file,
        type: type,
      };
      console.log("formData", formData);
      state.formDataList = [...state.formDataList, formData];
    },
    removeFormData: (state, action) => {
      state.formDataList = state.formDataList.filter(
        (formData) => formData.id !== action.payload
      );
    },
  },
});

export const { addFormData, removeFormData } = formDataSlice.actions;

export default formDataSlice.reducer;
