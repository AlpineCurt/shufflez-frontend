import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import ShufflezPage from "./pages/ShufflezPage";
//import RangeMatrix from "./components/RangeMatrix/RangeMatrix";
import { Box } from "@mui/material";
import "./App.css";

function App() {
  return (
    <Box>
      <Routes>
        <Route key={"rangematrix"} path="/range" element={<ShufflezPage />} />
      </Routes>
    </Box>
  );
}

export default App;
