const { eliminarArchivo } = require("../utilidades/archivos");
const mensaje = require("../utilidades/console");
const { descargarArchivo } = require("../utilidades/csv");
const { ordernarDatosAscendente } = require("../utilidades/filtros");
const {
  obtenerNombreDelArchivoDelCasoCSV,
  obtenerTituloDelCaso,
} = require("../utilidades/nombre");
const { obtenerFechas } = require("./sala_situacional");
const { crearUltimosDatos } = require("./ultimos");

const crearCaso = async (nombreDelCaso, filtrarDatos, extra = false) => {
  const { ultima_fecha, datos, ok } = await descargarArchivo(nombreDelCaso);
  if (ok === true) {
    const datosFiltrados = await filtrarDatos(datos);
    await crearCasosPorFechaSituacional(nombreDelCaso, datosFiltrados, extra);
    await crearUltimosDatos(nombreDelCaso, datosFiltrados, ultima_fecha, extra);
  }
  await eliminarCasoDescargado(nombreDelCaso);
};

const crearCasosPorFechaSituacional = async (caso, datos, extra) => {
  const fechasDeLaSalaSituacional = ordernarDatosAscendente(
    obtenerFechas(),
    "id"
  );

  for (const index in fechasDeLaSalaSituacional) {
    const penultima_fecha = fechasDeLaSalaSituacional[index - 1]
      ? fechasDeLaSalaSituacional[index - 1].id
      : 0;

    const datosDeFechaEspecifica = datos.filter(
      (d) => d.fecha <= fechasDeLaSalaSituacional[index].id
    );

    await crearUltimosDatos(
      caso,
      datosDeFechaEspecifica,
      fechasDeLaSalaSituacional[index].id,
      extra,
      {
        penultima_fecha,
      }
    );
  }
};

const eliminarCasoDescargado = (nombreDelCaso) => {
  eliminarArchivo(obtenerNombreDelArchivoDelCasoCSV(nombreDelCaso));
  mensaje(
    obtenerTituloDelCaso(nombreDelCaso),
    `El archivo ${obtenerNombreDelArchivoDelCasoCSV(nombreDelCaso)} se elimino`
  );
};

module.exports = {
  crearCaso,
};
