const {
  CASO,
  obtenerNombreDelArchivoDeLaUltimaActualizacion,
  obtenerNombreDelArchivoPorFecha,
} = require("../database/utilidades/nombre");

export const obtenerUltimoDato = (caso, res, fecha, ultimaFecha) => {
  switch (caso) {
    case "positivos":
      return obtenerDatosDelUltimoDato(CASO.positivo, fecha, res, ultimaFecha);
    case "fallecidos":
      return obtenerDatosDelUltimoDato(CASO.fallecido, fecha, res, ultimaFecha);
    case "vacunados":
      return obtenerDatosDelUltimoDato(CASO.vacunado, fecha, res, ultimaFecha);
    case "sala-situacional":
      return obtenerDatosDelUltimoDato(
        CASO.sala_situacional,
        fecha,
        res,
        ultimaFecha
      );
    default:
      return res
        .status(404)
        .json({ status: 404, message: "ruta no econtrada" });
  }
};

export const obtenerCasoPorFecha = (caso, fecha, res) => {
  switch (caso) {
    case "positivos":
      return obtenerDatosDelCaso(CASO.positivo, fecha, res);
    case "fallecidos":
      return obtenerDatosDelCaso(CASO.fallecido, fecha, res);
    case "vacunados":
      return obtenerDatosDelCaso(CASO.vacunado, fecha, res);
    case "sala-situacional":
      return obtenerDatosDelCaso(CASO.sala_situacional, fecha, res);
    default:
      return res
        .status(404)
        .json({ status: 404, message: "ruta no econtrada" });
  }
};

const obtenerDatosDelUltimoDato = (caso, fecha, res, ultimaFecha) => {
  let nombreDelArchivo = "";
  if (ultimaFecha) {
    nombreDelArchivo = obtenerNombreDelArchivoDeLaUltimaActualizacion(caso);
  } else {
    nombreDelArchivo = obtenerNombreDelArchivoPorFecha(fecha, caso);
  }

  nombreDelArchivo = nombreDelArchivo.replace("./data/", "");
  const obtenerDatosPorFecha = require(`../data/${nombreDelArchivo}`);

  return res
    .status(200)
    .json({ status: 200, fecha, data: obtenerDatosPorFecha });
};

const obtenerDatosDelCaso = (caso, fecha, res) => {
  const nombreDelArchivo = obtenerNombreDelArchivoPorFecha(fecha, caso).replace(
    "./data/",
    ""
  );
  try {
    const obtenerDatosPorFecha = require(`../data/${nombreDelArchivo}`);
    return res
      .status(200)
      .json({ status: 200, fecha, data: obtenerDatosPorFecha });
  } catch (error) {
    return res.status(404).json({ status: 404, message: "fecha no valida" });
  }
};

export const obtenerUltimoDatoPorCaso = (caso) => {
  let nombreDelArchivo = "";
  switch (caso) {
    case "positivos":
      nombreDelArchivo = obtenerNombreDelArchivoDeLaUltimaActualizacion(
        CASO.positivo
      );
      nombreDelArchivo = nombreDelArchivo.replace("./data/", "");
      return require(`../data/${nombreDelArchivo}`);
    case "fallecidos":
      nombreDelArchivo = obtenerNombreDelArchivoDeLaUltimaActualizacion(
        CASO.fallecido
      );
      nombreDelArchivo = nombreDelArchivo.replace("./data/", "");
      return require(`../data/${nombreDelArchivo}`);
    case "vacunados":
      nombreDelArchivo = obtenerNombreDelArchivoDeLaUltimaActualizacion(
        CASO.vacunado
      );
      nombreDelArchivo = nombreDelArchivo.replace("./data/", "");
      return require(`../data/${nombreDelArchivo}`);
    case "sala-situacional":
      return obtenerDatoDeFecha();
    default:
      return "error";
  }
};

const obtenerDatoDeFecha = () => {
  const fechaActual = new Date();
  let dia = fechaActual.getDate() - 1;
  let mes = fechaActual.getMonth() + 1;
  const año = fechaActual.getFullYear();

  let fechaCompleta = `${String(dia).padStart(2, 0)}${String(mes).padStart(
    2,
    0
  )}${año}`;
  let fechaCompletaSlash = `${String(dia).padStart(2, 0)}/${String(
    mes
  ).padStart(2, 0)}/${año}`;
  let dato = "";
  try {
    dato = require(`../data/sala_situacional/${fechaCompleta}.json`);
  } catch (error) {
    fechaCompleta = `${String(dia - 1).padStart(2, 0)}${String(mes).padStart(
      2,
      0
    )}${año}`;
    fechaCompletaSlash = `${String(dia - 1).padStart(2, 0)}/${String(
      mes
    ).padStart(2, 0)}/${año}`;
    dato = require(`../data/sala_situacional/${fechaCompleta}.json`);
  }

  return { fecha: fechaCompletaSlash, data: dato };
};
