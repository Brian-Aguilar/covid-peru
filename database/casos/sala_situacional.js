const download = require("download");
const XLSX = require("xlsx");

const {
  obtenerUrlDeLaSalaSituacional,
  obtenerNombreDelArchivoDeLaSalaSituacional,
} = require("../utilidades/nombre");
const {
  crearArchivo,
  existeArchivo,
  leerArchivo,
  crearCarpeta,
  eliminarArchivo,
} = require("../utilidades/archivos");
const {
  fechaEs,
  convertirFechaESaEU,
  convertirFechaES,
} = require("../utilidades/fechas");
const {
  filtrarDatosEspecificos,
  sumarDatosEnArray,
  ordenarDatosDescendentes,
  ordernarDatosEnterosDescendentes,
} = require("../utilidades/filtros");
const mensaje = require("../utilidades/console");

const carpetaBase = "./data/sala_situacional/";

// Fecha recibida : 01012020 / dia-mes-año
const crearSalaSituacional = async (fecha) => {
  const { dia, mes, año } = fechaEs(fecha);

  const obtenerURL = obtenerUrlDeLaSalaSituacional(dia, mes, año);
  const nombreDelArchivo = obtenerNombreDelArchivoDeLaSalaSituacional(
    dia,
    mes,
    año
  );
  const archivoXLSX = `${nombreDelArchivo}.xlsx`;
  const archivoJSON = `${nombreDelArchivo}.json`;

  if (await descargarArchivoXLSX(archivoXLSX, obtenerURL)) {
    const datosXLSX = XLSX.readFile(archivoXLSX);
    const nombresSheet = datosXLSX.SheetNames;

    const datosArrays = XLSX.utils
      .sheet_to_json(datosXLSX.Sheets[nombresSheet], { header: 1 })
      .slice(1);

    const datosObtenidos = datosArrays.map((dato) => ({
      departamento: `${dato[1]}`.toLowerCase(),
      pcr: dato[2],
      pr: dato[3],
      pa: dato[4],
      positivos: dato[5],
      fallecidos: dato[6],
    }));

    crearArchivoJSON(
      fecha,
      ordenarDatosDescendentes(datosObtenidos, "departamento"),
      archivoJSON
    );

    eliminarArchivo(archivoXLSX);
  }
};

const descargarArchivoXLSX = async (nombre, url) => {
  const fecha = nombre.replace(carpetaBase, "");
  if (existeArchivo(carpetaBase) !== true) {
    crearCarpeta(carpetaBase);
  }

  if (existeArchivo(nombre) !== true) {
    try {
      mensaje("Sala Situacional", `${fecha} se esta descargando...`);
      crearArchivo(nombre, await download(url));
      mensaje("Sala Situacional", `${fecha} se descargo`);
      return true;
    } catch (error) {
      mensaje("Sala Situacional", `${fecha} no existe en los servidores`);
      return false;
    }
  } else {
    mensaje("Sala Situacional", `${fecha} ya existe`);
    return true;
  }
};

const crearArchivoJSON = (fecha, datosSS, nombreDelArchivoPorFecha) => {
  const nombreDelArchivo = "./data/fechas.json";

  const datos = {
    id: parseInt(convertirFechaESaEU(fecha, "")),
    fecha: fecha,
    fecha_convertir: convertirFechaES(fecha, "/"),
  };
  let datosDeFecha = [];

  if (existeArchivo(nombreDelArchivo)) {
    datosDeFecha = leerArchivo(nombreDelArchivo, true);
  } else {
    datosDeFecha = [];
  }

  const obtenerfecha = datosDeFecha.filter((fecha) => fecha.id === datos.id);
  if (obtenerfecha.length == 0) {
    datosDeFecha = ordernarDatosEnterosDescendentes(
      [datos, ...datosDeFecha],
      "id"
    );
    crearArchivo(nombreDelArchivo, datosDeFecha, true);
    mensaje(
      "Sala Situacional",
      `fecha ${convertirFechaES(fecha, "/")} se agrego`
    );
    const datosCompleto = { ...obtenerDatosTotales(datosSS), datos: datosSS };
    crearArchivo(nombreDelArchivoPorFecha, datosCompleto, true);
  } else {
    mensaje(
      "Sala Situacional",
      `fecha ${convertirFechaES(fecha, "/")} no se agrego`
    );
  }
};

const obtenerDatosTotales = (datos) => {
  const pcr = sumarDatosEnArray(filtrarDatosEspecificos(datos, "pcr"));
  const pr = sumarDatosEnArray(filtrarDatosEspecificos(datos, "pr"));
  const pa = sumarDatosEnArray(filtrarDatosEspecificos(datos, "pa"));
  const positivos = sumarDatosEnArray(
    filtrarDatosEspecificos(datos, "positivos")
  );
  const fallecidos = sumarDatosEnArray(
    filtrarDatosEspecificos(datos, "fallecidos")
  );

  return {
    pcr,
    pr,
    pa,
    positivos,
    fallecidos,
  };
};

module.exports = {
  crearSalaSituacional,
};
