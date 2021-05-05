const { formatearDiaOMes, fechaEsCompleta } = require("./fechas");

const archivoBase = "./data";

const CASO = {
  positivo: "positivo",
  fallecido: "fallecido",
  vacunado: "vacunado",
  sala_situacional: "sala_situacional",
  error: "error",
};

const obtenerURLDelCaso = (caso) => {
  switch (caso) {
    case CASO.fallecido:
      return "https://www.datosabiertos.gob.pe/api/3/action/package_show?id=b44c937b-7f6d-4165-be78-f7d55651ee28";
    case CASO.positivo:
      return "https://www.datosabiertos.gob.pe/api/3/action/package_show?id=3423d336-63b5-4a73-af54-7f9836a9bb26";
    case CASO.vacunado:
      return "https://www.datosabiertos.gob.pe/api/3/action/package_show?id=24af4ff4-226d-4e3d-90cb-d26a1849796e";
    default:
      return CASO.error;
  }
};

const obtenerUrlDeLaSalaSituacional = (dia, mes, año) => {
  return `https://covid19.minsa.gob.pe/files/CASOS_${formatearDiaOMes(
    dia
  )}${formatearDiaOMes(mes)}${año}.xlsx`;
};

const obtenerTituloDelCaso = (caso) => {
  switch (caso) {
    case CASO.fallecido:
      return "Casos Fallecidos";
    case CASO.positivo:
      return "Casos Positivos";
    case CASO.vacunado:
      return "Casos Vacunados";
    default:
      return CASO.error;
  }
};

const obtenerNombreDelArchivoDelCasoCSV = (caso) => {
  switch (caso) {
    case CASO.fallecido:
      return `${archivoBase}/datosFallecidos.csv`;
    case CASO.positivo:
      return `${archivoBase}/datosPositivos.csv`;
    case CASO.vacunado:
      return `${archivoBase}/datosVacunados.csv`;
    default:
      return CASO.error;
  }
};

const obtenerNombreDelArchivoDeLaUltimaActualizacion = (caso) => {
  switch (caso) {
    case CASO.fallecido:
      return `${archivoBase}/ultimosDatosFallecidos.json`;
    case CASO.positivo:
      return `${archivoBase}/ultimosDatosPositivos.json`;
    case CASO.vacunado:
      return `${archivoBase}/ultimosDatosVacunados.json`;
    case CASO.sala_situacional:
      return `${archivoBase}/ultimosDatosSalaSituacional.json`;

    default:
      return CASO.error;
  }
};

const obtenerNombreDelArchivoDeLaSalaSituacional = (dia, mes, año) => {
  return `${archivoBase}/sala_situacional/${fechaEsCompleta(dia, mes, año)}`;
};

const obtenerNombreDelArchivoPorFecha = (fecha, caso) => {
  return `${archivoBase}/${caso}/${fecha}.json`;
};

module.exports = {
  CASO,
  obtenerNombreDelArchivoDeLaSalaSituacional,
  obtenerNombreDelArchivoDeLaUltimaActualizacion,
  obtenerNombreDelArchivoDelCasoCSV,
  obtenerNombreDelArchivoPorFecha,
  obtenerTituloDelCaso,
  obtenerUrlDeLaSalaSituacional,
  obtenerURLDelCaso,
};
