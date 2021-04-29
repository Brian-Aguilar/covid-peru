import { createContext, useEffect, useMemo, useState } from "react";
import { urlApi } from "../utils/urls";

export const FechasContext = createContext();

export const FechasProvider = ({ children }) => {
  const [totalDeFechas, setTotalDeFechas] = useState([]);

  const obtenerTodasLasFechas = useMemo(() => {
    fetch(`${urlApi}/api/fechas`)
      .then((datos) => datos.json())
      .then((data) => setTotalDeFechas(data.data));
  }, []);

  useEffect(() => {
    obtenerTodasLasFechas;
  }, []);

  return (
    <FechasContext.Provider value={{ totalDeFechas }}>
      {children}
    </FechasContext.Provider>
  );
};
