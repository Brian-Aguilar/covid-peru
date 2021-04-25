import { useCallback, useEffect, useState } from "react";
import { urlApi } from "../utils/urls";

const useFechasSS = (todasLasFechas, ultimaFecha) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fechas] = useState(todasLasFechas);
  const [fecha, setFecha] = useState(ultimaFecha);
  const [datoPorFecha, setDatoPorFecha] = useState([]);

  const obtenerDatosPorFecha = useCallback(() => {
    setIsLoading(true);
    fetch(`${urlApi}/api/casos/sala-situacional/${fecha.fecha}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setDatoPorFecha(data.data);
        } else {
          setDatoPorFecha(data);
        }
        setIsLoading(false);
      });
  }, [fecha]);

  const selectValue = (e) => {
    const obtenerFecha = fechas.filter((f) => f.fecha === e.target.value)[0];
    setFecha(obtenerFecha);
  };

  useEffect(() => {
    if (fecha.id !== "") {
      obtenerDatosPorFecha();
    }
  }, [fecha]);

  return { fechas, fecha, selectValue, datoPorFecha, isLoading };
};

export default useFechasSS;
