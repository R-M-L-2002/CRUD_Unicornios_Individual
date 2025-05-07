import { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axiosInstance";

// Contexto
export const UnicornContext = createContext();

// envuelve componentes hijos con datos globales
export const UnicornProvider = ({ children }) => {
  const [unicorns, setUnicorns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener unicorns
  const getUnicorns = async () => {
    setLoading(true);
    try {
      const response = await api.get("/");
      setUnicorns(response.data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false)
    }
  }

  // Crear
  const createUnicorn = async (newUnicorn) => {
    setLoading(true);
    try {
      const response = await api.post("/", newUnicorn);
      setUnicorns((prev) => [...prev, response.data])
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false)
    }
  }

  // Editar
  const editUnicorn = async (id, updatedUnicorn) => {
    try {
      await api.put(`/${id}`, updatedUnicorn);
      setUnicorns((prev) =>
        prev.map((u) => (u._id === id ? { ...updatedUnicorn, _id: id } : u))
      );
    } catch (e) {
      setError(e.message);
    }
  }

  // Eliminar
  const deleteUnicorn = async (id) => {
    try {
      await api.delete(`/${id}`);
      setUnicorns((prev) => 
        prev.filter((u) => u._id !== id));
    } catch (e) {
      setError(e.message)
    }
  }

  const getUnicornById = (id) => {
    return unicorns.find((u) => u._id === id)
  }

  // Cargar unicornios
  useEffect(() => {
    getUnicorns()
  }, [])

  return (
    <UnicornContext.Provider
      value={{
        unicorns,
        loading,
        error,
        getUnicorns,
        createUnicorn,
        editUnicorn,
        deleteUnicorn,
        getUnicornById
      }}
    >
      {children}
    </UnicornContext.Provider>
  );
}

export const useUnicorns = () => useContext(UnicornContext);
