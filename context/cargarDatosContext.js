import { createContext, useState } from "react";
import Cargando from "../components/Cargando";

export const CargarDatosContext = createContext();

export const CargarDatosProvider = ({ children }) => {
  const [cargandoDatos, setCargandoDatos] = useState(true);

  return (
    <CargarDatosContext.Provider value={{ cargandoDatos, setCargandoDatos }}>
      <Cargando />
      {children}
    </CargarDatosContext.Provider>
  );
};
