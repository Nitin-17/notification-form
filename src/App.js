import React from "react";
import FileForm from "./components/FileForm.js";
import { NavLink, Route, Routes } from "react-router-dom";
import FileList from "./components/FileList.js";
import PDFDocument from "./helper/reactPdf.js";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/filelist">Filelist</NavLink>
          </li>
          {/* <li>
            <PDFDocument />
          </li> */}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<FileForm />} />
        <Route path="/filelist" element={<FileList />} />
      </Routes>
    </div>
  );
};

export default App;
