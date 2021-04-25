import { useCallback, useEffect, useState } from "react";
import { urlApi } from "../utils/urls";

const useFechaPorCaso = (
  caso,
  todasLasFechas,
  fechaSelecionnada,
  datoFecha
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fechas] = useState(todasLasFechas);
  const [fecha, setFecha] = useState(fechaSelecionnada);
  const [datoPorFecha, setDatoPorFecha] = useState(datoFecha);

  const obtenerDatosPorFecha = useCallback(() => {
    setIsLoading(true);
    if (fecha.id !== 0) {
      fetch(`${urlApi}/api/casos/${caso}/${fecha.fecha}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setDatoPorFecha(data.data);
          } else {
            setDatoPorFecha(data);
          }
          setIsLoading(false);
        });
    } else {
      fetch(`${urlApi}/api/casos/${caso}/ultimos-datos`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setDatoPorFecha(data.data);
          } else {
            setDatoPorFecha(data);
          }
          setIsLoading(false);
        });
    }
  }, [fecha, caso]);

  const selectValue = (e) => {
    const obtenerFecha = fechas.filter((f) => f.fecha === e.target.value)[0];
    setFecha(obtenerFecha);
  };

  useEffect(() => {
    obtenerDatosPorFecha();
  }, [fecha, caso]);

  return {
    fechas,
    fecha,
    setFecha,
    selectValue,
    datoPorFecha,
    isLoading,
  };
};

export default useFechaPorCaso;
