import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Task from "./pages/Task";
import TaskCreate from "./pages/TaskCreate";
import { useSelector } from "react-redux";
function App() {
  const {user} = useSelector((state) => state.user)
  return (
    <Router>
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Navigate to="/home" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
        <Route path="/task/:id" element={user ? <Task /> : <Navigate to="/" />} />
        <Route path="/task/create" element={user ? <TaskCreate /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
