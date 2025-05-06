import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>🌟🌸🌈 Bienvenido 🌟🌸🌈</h1>
        <Button 
          label="Unicornios" 
          onClick={() => navigate("/unicornios")} 
        />
        <Button 
          label="Productos" 
          onClick={() => navigate("/productos")} 
        />
    </div>
  );
}

export default Home;
