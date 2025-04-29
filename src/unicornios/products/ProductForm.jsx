import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InputText, InputNumber, Button, Card } from 'primereact';

const ProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
      const productToEdit = storedProducts.find((prod) => prod.id === parseInt(id));
      if (productToEdit) {
        setName(productToEdit.name);
        setPrice(productToEdit.price);
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];

    if (id) {
      // Editar
      const updatedProducts = storedProducts.map((prod) =>
        prod.id === parseInt(id)
          ? { ...prod, name, price }
          : prod
      );
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    } else {
      // Crear
      const newProduct = {
        id: Date.now(),
        name,
        price,
      };
      const updatedProducts = [...storedProducts, newProduct];
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    }

    navigate("/productos");
  };

  return (
    <div>
      <Card>
        <h2>{id ? "🌾🌱🖍️Editar Producto🌾🌱🖍️" : "👛🍓🪻Crear Producto👛🍓🪻"}</h2>
        <form onSubmit={handleSubmit} className="p-fluid">
            <div className="p-field">
            <label 
            htmlFor="name">Nombre</label>
            <InputText 
            id="name" 
            value={name} 
            onChange={(e) => 
            setName(e.target.value)} required />
            </div>

            <div className="p-field">
            <label 
            htmlFor="price">Precio</label>
            <InputNumber 
            id="price" 
            value={price} 
            onValueChange={(e) => 
            setPrice(e.value)} required />
            </div>

            <Button type="submit" 
            label={id ? "Guardar Cambios" 
            : 
            "Crear Producto"} 
            icon="pi pi-check" />
        </form>
      </Card>
    </div>
    
  );
}

export default ProductForm
