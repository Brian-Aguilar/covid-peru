const download = require("download");
const CSV = require("papaparse");

const {
  obtenerNombreDelArchivoDelCasoCSV,
  obtenerTituloDelCaso,
} = require("./nombre");
const { existeArchivo, leerArchivo, crearArchivo } = require("./archivos");
const { obtenerUrlDelCaso } = require("./descargarArchivos");
const mensaje = require("./console");

const descargarArchivo = async (caso) => {
  const nombreDelCaso = obtenerTituloDelCaso(caso);
  const nombreDelArchivo = obtenerNombreDelArchivoDelCasoCSV(caso);

  if (existeArchivo(nombreDelArchivo) !== true) {
    const { status, url } = await obtenerUrlDelCaso(caso);
    if (status === 200) {
      mensaje(nombreDelCaso, "descargando...");
      try {
        crearArchivo(nombreDelArchivo, (await download(url)).toString());
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
  return await configuracionCSV(caso);
};

const obtenerArchivoDescargado = (caso) => {
  return leerArchivo(obtenerNombreDelArchivoDelCasoCSV(caso));
};

const configuracionCSV = async (caso) => {
  const configuracion = {
    header: false,
    preview: 0,
    comments: false,
    download: false,
    delimiter: caso === "vacunado" ? "," : ";",
  };
  try {
    const { data: datos } = CSV.parse(
      await obtenerArchivoDescargado(caso),
      configuracion
    );

    return {
      ultima_fecha: parseInt(datos[1][0]),
      datos: datos.filter((d) => d[1] !== undefined).slice(1),
      ok: true,
    };
  } catch (error) {
    console.log("Error el archivo es muy pesado.");
    return {
      ok: false,
    };
  }
};

module.exports = {
  descargarArchivo,
  obtenerArchivoDescargado,
};
