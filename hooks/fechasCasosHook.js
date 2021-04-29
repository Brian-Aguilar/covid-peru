import { useCallback, useEffect, useState } from "react";
import { urlApi } from "../utils/urls";

const fechaInitial = {
  id: 0,
  fecha: "Ultima Actualización",
  fecha_convertir: "Ultima Actualización",
};

const useFechaPorCaso = (caso, totalDeFechas) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fechas, setFechas] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [datoPorFecha, setDatoPorFecha] = useState(null);

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
    if (totalDeFechas.length > 0) {
      setFechas([fechaInitial, ...totalDeFechas]);
      setFecha(fechaInitial);
    }
  }, [totalDeFechas]);
  useEffect(() => {
    if (fecha !== null) {
      obtenerDatosPorFecha();
    }
  }, [fecha, caso]);

  return {
    fechas,
    fecha,
    selectValue,
    datoPorFecha,
    isLoading,
  };
};

export default useFechaPorCaso;
