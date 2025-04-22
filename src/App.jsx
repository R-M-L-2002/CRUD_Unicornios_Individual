import { useState, Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UnicornProvider } from "./context/UnicornContext";
import UnicornsRoutes from "./unicornios/unicorns";
import Home from "./Home";  
import './App.css'
import 'primereact/resources/themes/lara-light-purple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <Router>
      <UnicornProvider>
        <Routes>
          {/* Ruta para la Home */}
          <Route path="/" element={<Home />} />
          
          {/* Ruta para los unicornios */}
          <Route path="/unicornios/*" element={<UnicornsRoutes />} />
        </Routes>
      </UnicornProvider>
    </Router>
  );
}

export default App;