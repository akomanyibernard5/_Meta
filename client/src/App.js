import React from "react";
import "./index.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Info_Page from "./Pages/Info_Page";
import Donate from "./Pages/Donation";
import Success from "./Pages/success";
import Failed from "./Pages/Failed";
import AdminPage from "./Pages/Admin";
import Events from "./Pages/Events";
import Form from "./Pages/Pre-Screen-Form";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Info_Page />} />
        <Route path="/form-details" element={<Form />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failed" element={<Failed />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </Router>
  );
};

export default App;