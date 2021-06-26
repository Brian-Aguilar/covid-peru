const csv = require("csv-parser");
const fs = require("fs");

const {
  obtenerNombreDelArchivoDelCasoCSV,
  obtenerTituloDelCaso,
} = require("./nombre");
const { existeArchivo, leerArchivo } = require("./archivos");
const {
  obtenerUrlDelCaso,
  descargarArchivoCSV,
} = require("./descargarArchivos");
const mensaje = require("./console");

const descargarArchivo = async (caso) => {
  const nombreDelCaso = obtenerTituloDelCaso(caso);
  const nombreDelArchivo = obtenerNombreDelArchivoDelCasoCSV(caso);

  if (existeArchivo(nombreDelArchivo) !== true) {
    const { status, url } = await obtenerUrlDelCaso(caso);
    if (status === 200) {
      mensaje(nombreDelCaso, "descargando...");
      try {
        descargarArchivoCSV(url, nombreDelArchivo);
        mensaje(nombreDelCaso, "se descargo correctamente");
      } catch (error) {
        mensaje(nombreDelCaso, "error al descargar el archivo");
      }
    } else {
      mensaje(nombreDelCaso, "no se encuentra en los servidores");
    }
  } else {
    mensaje(nombreDelCaso, "el archivo ya existe");
  }

  return await csvAJson(nombreDelArchivo);
};

const obtenerArchivoDescargado = (caso) => {
  return leerArchivo(obtenerNombreDelArchivoDelCasoCSV(caso));
};

const csvAJson = async (nombreDelArchivo, separador = ";") => {
  try {
    const datos = [];
    const response = fs
      .createReadStream(nombreDelArchivo, { encoding: "utf-8" })
      .pipe(csv({ separator: separador }));
    for await (const data of response) {
      datos.push(data);
    }
    return {
      fecha_corte: parseInt(datos[0]["FECHA_CORTE"]),
      datos: datos,
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
    };
  }
};

module.exports = {
  descargarArchivo,
  obtenerArchivoDescargado,
};
