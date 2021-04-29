import { useCallback, useEffect, useState } from "react";
import { urlApi } from "../utils/urls";

const useFechasSS = (todasLasFechas) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fechas, setFechas] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [datoPorFecha, setDatoPorFecha] = useState(null);

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
    if (todasLasFechas.length !== 0) {
      setFechas(todasLasFechas);
      setFecha(todasLasFechas[0]);
    }
  }, [todasLasFechas]);
  useEffect(() => {
    if (fecha !== null) {
      obtenerDatosPorFecha();
    }
  }, [fecha]);

  return { fechas, fecha, selectValue, datoPorFecha, isLoading };
};

export default useFechasSS;
