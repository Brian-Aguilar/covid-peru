import { useCallback, useEffect, useState } from "react";

const initialFecha = {
  fecha: "cargando...",
  id: "",
};

const useFechasSS = () => {
  const [fechas, setFechas] = useState([]);
  const [fecha, setFecha] = useState(initialFecha);
  const [datoPorFecha, setDatoPorFecha] = useState([]);

  const obtenerFechas = useCallback(() => {
    console.log("API llamando a todas las fechas");
    fetch("http://localhost:3000/api/fechas")
      .then((res) => res.json())
      .then((data) => {
        setFechas(data.data);
        setFecha({
          ...data.data[0],
        });
      });
  }, []);

  const obtenerDatosPorFecha = useCallback(() => {
    console.log(`API obteniedo datos de ${fecha.fecha}`);
    fetch(`http://localhost:3000/api/casos/sala-situacional/${fecha.fecha}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setDatoPorFecha(data.data);
        } else {
          setDatoPorFecha(data);
        }
      });
  }, [fecha]);

  const selectValue = (e) => {
    const obtenerFecha = fechas.filter((f) => f.fecha === e.target.value)[0];
    setFecha(obtenerFecha);
  };

  useEffect(() => {
    obtenerFechas();
  }, [obtenerFechas]);

  useEffect(() => {
    if (fecha.id !== "") {
      obtenerDatosPorFecha();
    }
  }, [fecha]);

  return { fechas, fecha, selectValue, datoPorFecha };
};

export default useFechasSS;
