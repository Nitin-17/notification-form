import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFormData } from "../features/listSlice";
import { viewHtml } from "../helper/utils";

const FileList = () => {
  const formDataList = useSelector((state) => state.formDataList);
  const dispatch = useDispatch();
  console.log("formDatalist", formDataList);
  return (
    <>
      <div className="flex flex-row justify-center items-center text-xl font-bold mb-4">
        Item List
      </div>
      <ul className="divide-y divide-gray-200 flex flex-col gap-2">
        {formDataList ? (
          formDataList.map((formData) => (
            <li
              key={formData.id}
              className="py-4 flex justify-between items-center"
            >
              <div className="flex flex-row gap-4 justify-center items-center">
                <p className="text-lg font-semibold">{formData.name}</p>
                <p className="text-gray-600">{formData.description}</p>
                <p className="text-gray-600">{formData.type}</p>
                <p className="text-gray-600">{formData.date}</p>
              </div>
              <div className="flex space-x-4">
                <button
                  className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                  onClick={() => viewHtml(formData.file, formData.type)}
                >
                  View Item
                </button>
                <button
                  className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                  onClick={() => dispatch(removeFormData(formData.id))}
                >
                  Delete Item
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No Data Found</p>
        )}
      </ul>
    </>
  );
};

export default FileList;
