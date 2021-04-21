import {
  existeArchivo,
  leerArchivo,
} from "../../../../database/utilidades/archivos";
import {
  CASO,
  obtenerNombreDelArchivoPorFecha,
} from "../../../../database/utilidades/nombre";

const obtenerCaso = (caso, fecha, res) => {
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

const obtenerDatosDelCaso = (caso, fecha, res) => {
  const nombreDelArchivo = obtenerNombreDelArchivoPorFecha(fecha, caso);
  if (existeArchivo(nombreDelArchivo)) {
    const obtenerDatosPorFecha = leerArchivo(nombreDelArchivo, true);
    return res
      .status(200)
      .json({ status: 200, fecha, data: obtenerDatosPorFecha });
  } else {
    return res.status(404).json({ status: 404, message: "fecha no valida" });
  }
};

export default (req, res) => {
  const {
    method,
    query: { caso, fecha },
  } = req;

  if (method === "GET") {
    obtenerCaso(caso, fecha, res);
  } else {
    res.status(404).json({ status: 404, message: "ruta no econtrada" });
  }
};
