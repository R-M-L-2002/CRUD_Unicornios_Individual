import React from "react";
import { Link } from "react-router-dom";
import { useUnicorns } from "../../context/UnicornContext";
import { Button, DataTable, Column, Card } from "primereact";

const UnicornsView = () => {
  const { unicorns, deleteUnicorn } = useUnicorns();

  const handleDelete = (id) => {
    deleteUnicorn(id);
  }

  return (
    <div>
      <h1>🦄🌈Mis Unicornios🦄🌈</h1>
      <Card>
        <div>
          <DataTable 
          value={unicorns} 
          stripedRows showGridlines rows={5}>
            <Column 
            field="name" 
            header="Nombre" 
            style={{ width: '150px' }}/>
            <Column 
            field="color" 
            header="Color" 
            style={{ width: '120px' }}/>
            <Column 
            field="age" 
            header="Edad" 
            style={{ width: '100px' }}/>
            <Column 
            field="power" 
            header="Poder" 
            style={{ width: '150px' }} />
            <Column
              header="Acciones"
              body={(rowData) => (
                <>
                  <Link to={`/unicornios/editar/${rowData._id}`}>
                    <Button icon="pi pi-pencil" 
                    className="p-button-info p-button-sm" 
                  />
                  </Link>
                  <Button
                    icon="pi pi-trash"
                    className="p-button-danger p-button-sm"
                    onClick={() => handleDelete(rowData._id)}
                  />
                </>
              )}
            />
          </DataTable>
          <Link to="/unicornios/crear">
            <Button 
            label="Crear nuevo unicornio" 
            icon="pi pi-plus" 
            className="p-button-success" 
            />
          </Link>
          <Link to="/">
            <Button 
            label="Volver" 
            />
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default UnicornsView;
