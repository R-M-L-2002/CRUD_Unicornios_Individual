import React from "react";
import { Routes, Route } from "react-router-dom";
import UnicornsView from "./UnicornsView"; 
import UnicornForm from "./UnicornForm";

const UnicornsRoutes = () => {
  return (
    <Routes>
      {/* Todos los unicornios */}
      <Route path="/" element={<UnicornsView />} />
      
      {/* Ruta para crear */}
      <Route path="/crear" element={<UnicornForm />} />
      
      {/* Ruta para editar */}
      <Route path="/editar/:id" element={<UnicornForm />} />
    </Routes>
  );
}

export default UnicornsRoutes;