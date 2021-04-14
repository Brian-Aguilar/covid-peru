const { crearSalaSituacional } = require("./casos/sala_situacional");
const {
  convertirFechaESaEU,
  aumentarFecha,
  convertirFechaEUaES,
} = require("./utilidades/fechas");

const descargarTodasLasSalasSituacionales = (fechaInicial, fechaFinal) => {
  let datoInicial = convertirFechaESaEU(fechaInicial, "");
  const datoFinal = convertirFechaESaEU(fechaFinal, "");
  do {
    crearSalaSituacional(convertirFechaEUaES(datoInicial, ""));
    datoInicial = aumentarFecha(datoInicial, 1);
  } while (parseInt(datoInicial) <= parseInt(datoFinal));
};

descargarTodasLasSalasSituacionales("06052020", "14052020");
