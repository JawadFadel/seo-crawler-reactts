import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import IndexPage from "./pages";
import DashboardScreen from "./pages/admin/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} index />
        <Route path="/admin/*" element={<DashboardScreen />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
