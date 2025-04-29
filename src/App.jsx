import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UnicornProvider } from "./context/UnicornContext";
import UnicornsRoutes from "./unicornios/unicorns";
import ProductsRoutes from "./unicornios/products";  
import Home from "./Home";  
import './App.css';
import 'primereact/resources/themes/lara-light-purple/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para la Home */}
        <Route path="/" element={<Home />} />

        {/* Ruta para unicornios */}
        <Route
          path="/unicornios/*"
          element={
            <UnicornProvider>
              <UnicornsRoutes />
            </UnicornProvider>
          }
        />

        {/* Ruta para productos */}
        <Route path="/productos/*" element={<ProductsRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
