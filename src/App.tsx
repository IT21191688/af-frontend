import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import NavBar from "./components/NavBar";
import UserManagement from "./components/UserManagement";
import APODViewer from "./components/APODViewer";
import UserHome from "./components/UserHome";
import MarsRoverPhotos from "./components/MarsRoverPhotos";
import CMEAnalysis from "./components/CMEAnalysis";

function App() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    setUser(localStorage.getItem("role") || null);
  }, []);

  return (
    <Router>
      <div>
        <NavBar />
        <ToastContainer />

        <Routes>
          {user === "admin" && (
            <>
              <Route path="/userManagement" element={<UserManagement />} />
              <Route path="/userHome" element={<UserHome />} />
              <Route path="/marsRover" element={<MarsRoverPhotos />} />
              <Route path="/apodViewer" element={<APODViewer />} />
              <Route path="/cmeAnalysis" element={<CMEAnalysis />} />
            </>
          )}
          {user === "user" && (
            <>
              <Route path="/userHome" element={<UserHome />} />
              <Route path="/marsRover" element={<MarsRoverPhotos />} />
              <Route path="/apodViewer" element={<APODViewer />} />
              <Route path="/cmeAnalysis" element={<CMEAnalysis />} />
            </>
          )}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
