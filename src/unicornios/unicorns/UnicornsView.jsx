import React from "react";
import { Link } from "react-router-dom";
import { useUnicorns } from "../../context/UnicornContext";
import { Button, DataTable, Column } from "primereact";

const UnicornsView = () => {
  const { unicorns, deleteUnicorn } = useUnicorns();

  const handleDelete = (id) => {
    deleteUnicorn(id);
  }

  return (
    <div>
      <h1>🌈Mis Unicornios🌈</h1>
      <Link to="/unicornios/crear">
        <Button label="Crear nuevo unicornio" icon="pi pi-plus" className="p-button-success" />
      </Link>
      <DataTable value={unicorns} stripedRows showGridlines rows={5}>
        <Column field="name" header="Nombre" />
        <Column field="age" header="Edad" />
        <Column
          header="Acciones"
          body={(rowData) => (
            <>
              <Link to={`/unicornios/editar/${rowData._id}`}>
                <Button icon="pi pi-pencil" className="p-button-info p-button-sm" label="Editar" />
              </Link>
              <Button
                icon="pi pi-trash"
                className="p-button-danger p-button-sm"
                label="Eliminar"
                onClick={() => handleDelete(rowData._id)}
              />
            </>
          )}
        />
      </DataTable>
    </div>
  );
}

export default UnicornsView;
