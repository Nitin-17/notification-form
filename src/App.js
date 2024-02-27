import React from "react";
import FileForm from "./components/FileForm.js";
import { NavLink, Route, Routes } from "react-router-dom";
import FileList from "./components/FileList.js";
import "./App.css";
import SunEditorApp from "./helper/SunEditorApp.js";

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

          <li>
            <NavLink to="/suneditor">SunEditor</NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<FileForm />} />
        <Route path="/filelist" element={<FileList />} />
        <Route path="/suneditor" element={<SunEditorApp />} />
      </Routes>
    </div>
  );
};

export default App;
