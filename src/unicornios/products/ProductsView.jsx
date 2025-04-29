import { useState, useEffect } from "react";
import { initialProducts } from "./productsData";
import { Link } from "react-router-dom";
import { Button, DataTable, Column, Card} from 'primereact';

const ProductsView = () => {
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      const storedProducts = JSON.parse(localStorage.getItem('products'));
      if (storedProducts && storedProducts.length > 0) {
        setProducts(storedProducts);
      } else {
        setProducts(initialProducts);
        localStorage.setItem(
            'products', 
            JSON.stringify(initialProducts))
      }
    }, [])
  
    const deleteProduct = (id) => {
      const updatedProducts = products.filter((prod) => prod.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem(
        'products', 
        JSON.stringify(updatedProducts))
    }
  
    const actionTemplate = (rowData) => {
      return (
        <div className="flex gap-2">
          <Link to={`/productos/editar/${rowData.id}`}>
            <Button 
            icon="pi pi-pencil" 
            className="p-button-rounded p-button-info" />
          </Link>
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger"
            onClick={() => deleteProduct(rowData.id)}
          />
        </div>
      );
    };
  
    return (
      <div>
        <h1>🌷✨🪷Productos🌷✨🪷</h1>
        <Card>
          <div>
            <Link to="/productos/crear">
              <Button 
              label="Crear Nuevo Producto" 
              icon="pi pi-plus" />
            </Link>
          </div>
  
          <DataTable value={products} stripedRows showGridlines rows={3}>
            <Column 
            field="name" 
            header="Nombre" 
            style={{ width: '290px' }}/>
            <Column 
            field="price" 
            header="Precio" 
            body={(rowData) => 
            `$${rowData.price}`} />
            <Column 
            header="Acciones" 
            body={actionTemplate} />
          </DataTable>
        </Card>
      </div>
    );
  }

  export default ProductsView