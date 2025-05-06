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

    return (
      <div>
        <h1>🌷✨🪷Productos🌷✨🪷</h1>
        <Card>
          <DataTable value={products} stripedRows showGridlines rows={3}>
            <Column 
            field="name" 
            header="Nombre" 
            style={{ width: '290px' }}/>
            <Column 
            field="price" 
            header="Precio" 
            style={{ width: '120px' }}
            body={(rowData) => 
            `$${rowData.price}`} />
            <Column
              header="Acciones"
              body={(rowData) => (
                <>
                  <Link to={`/productos/editar/${rowData.id}`}>
                    <Button icon="pi pi-pencil" 
                    className="p-button-info p-button-sm" 
                  />
                  </Link>
                  <Button
                    icon="pi pi-trash"
                    className="p-button-danger p-button-sm"
                    onClick={() => deleteProduct(rowData.id)}  
                  />
                </>
              )}
            />
          </DataTable>
          <Link to="/productos/crear">
            <Button 
            label="Crear Nuevo Producto" 
            icon="pi pi-plus" />
          </Link>
          <Link to="/">
            <Button 
            label="Volver" 
            />
          </Link>  
        </Card>
      </div>
    );
  }

  export default ProductsView