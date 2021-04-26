const {
  CASO,
  obtenerNombreDelArchivoDeLaUltimaActualizacion,
  obtenerNombreDelArchivoPorFecha,
} = require("../database/utilidades/nombre");

const { leerArchivo } = require("../database/utilidades/archivos");

export const obtenerCaso = (caso, res, fecha, ultimaFecha) => {
  switch (caso) {
    case "positivos":
      return obtenerDatosDelCaso(CASO.positivo, fecha, res, ultimaFecha);
    case "fallecidos":
      return obtenerDatosDelCaso(CASO.fallecido, fecha, res, ultimaFecha);
    case "vacunados":
      return obtenerDatosDelCaso(CASO.vacunado, fecha, res, ultimaFecha);
    case "sala-situacional":
      return obtenerDatosDelCaso(
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

const obtenerDatosDelCaso = (caso, fecha, res, ultimaFecha) => {
  let nombreDelArchivo = "";
  if (ultimaFecha) {
    nombreDelArchivo = obtenerNombreDelArchivoDeLaUltimaActualizacion(caso);
  } else {
    nombreDelArchivo = obtenerNombreDelArchivoPorFecha(fecha, caso);
  }

  if (leerArchivo(nombreDelArchivo)) {
    nombreDelArchivo = nombreDelArchivo.replace("./data/", "");
    const obtenerDatosPorFecha = require(`../data/${nombreDelArchivo}`);
    return res
      .status(200)
      .json({ status: 200, fecha, data: obtenerDatosPorFecha });
  } else {
    return res.status(404).json({ status: 404, message: "fecha no valida" });
  }
};
