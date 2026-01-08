import React, { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import ManageSkills from "./Pages/ManageSkills";
import ManageTimeline from "./Pages/ManageTimeline";
import ManageProjects from "./Pages/ManageProjects";
import ViewProject from "./Pages/ViewProject";
import UpdateProject from "./Pages/UpdateProject";
import { useDispatch } from "react-redux";
import { getUser } from "./store/slices/userSlice.js";

function App() {

   const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/manage/skills" element={<ManageSkills />} />
        <Route path="/manage/timeline" element={<ManageTimeline />} />
        <Route path="/manage/projects" element={<ManageProjects />} />
        <Route path="/view/project/:id" element={<ViewProject />} />
        <Route path="/update/project/:id" element={<UpdateProject />} />
      </Routes>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  )
}

export default App;



