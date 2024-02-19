import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFormData } from "../features/listSlice";
import { viewHtml } from "../helper/utils";

const FileList = () => {
  const formDataList = useSelector((state) => state.formDataList);
  const dispatch = useDispatch();
  return (
    <>
      <div>Todos</div>
      <ul>
        {formDataList.map((formData) => (
          <li key={formData.id}>
            <div>
              <p>{formData.name}</p>
              <p>{formData.description}</p>
            </div>
            <button onClick={() => dispatch(removeFormData(formData.id))}>
              Delete Item
            </button>
            <button onClick={() => viewHtml(formData.file, formData.type)}>
              View Item
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default FileList;
