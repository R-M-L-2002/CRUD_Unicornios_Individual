import { createContext, useState, useEffect, useContext } from "react";

// Contexto
export const UnicornContext = createContext();

// API
const BASE_URL = "https://crudcrud.com/api/4774eccb46814d2dacf8d202ce73b768/unicorns";

// envuelve componentes hijos con datos globales
export const UnicornProvider = ({ children }) => {
  const [unicorns, setUnicorns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener unicorns
  const getUnicorns = async () => {
    setLoading(true);
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setUnicorns(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  // Crear
  const createUnicorn = async (newUnicorn) => {
    setLoading(true);
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUnicorn),
      });
      const data = await response.json();
      setUnicorns((prev) => [...prev, data])
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  // Editar
  const editUnicorn = async (id, updatedUnicorn) => {
    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUnicorn),
      });
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
      const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      if (response.ok) {
        setUnicorns((prev) => prev.filter((u) => u._id !== id));
      } else {
        throw new Error("No se pudo eliminar el unicornio.");
      }
    } catch (e) {
      setError(e.message);
    }
  }

  const getUnicornById = (id) => {
    return unicorns.find((u) => u._id === id);
  }

  // Cargar unicornios
  useEffect(() => {
    getUnicorns();
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
