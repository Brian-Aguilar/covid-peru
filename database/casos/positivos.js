const { CASO } = require("../utilidades/nombre");
const { crearCaso } = require("./base");
const {
  minusculas,
  convertirGenero,
  porcentaje,
} = require("../utilidades/extra");
const { convertirFechaEUaES } = require("../utilidades/fechas");
const { filtrarDatosEspecificos } = require("../utilidades/filtros");

const crearCasosPositivos = async () => {
  await crearCaso(CASO.positivo, filtrarCasosPositivos, datosExtras);
};

const filtrarCasosPositivos = (datos) =>
  datos.map((dato) => ({
    departamento: minusculas(dato["DEPARTAMENTO"]),
    distrito: minusculas(dato["DISTRITO"]),
    edad: parseInt(dato["EDAD"]),
    fecha_es_tipo: convertirFechaEUaES(`${dato["FECHA_RESULTADO"]}`, "/"),
    fecha_es: convertirFechaEUaES(`${dato["FECHA_RESULTADO"]}`, ""),
    fecha: parseInt(dato["FECHA_RESULTADO"]),
    genero: convertirGenero(dato["SEXO"]),
    metododx: minusculas(dato["METODODX"]),
    provincia: minusculas(dato["PROVINCIA"]),
  }));

const datosExtras = (datos) => {
  const metodoFiltrado = filtrarDatosEspecificos(datos, "metododx");
  return { metododx: metodoCP(metodoFiltrado) };
};

const metodoCP = (metododx) => {
  const datosDelMetododx = [...new Set(metododx)];
  let datos = [];
  datosDelMetododx.forEach((metodo) => {
    const totalPorMetododx = metododx.filter((m) => m === metodo).length;
    datos.push({
      nombre: `${metodo}`,
      casos: totalPorMetododx,
      porcentaje: porcentaje(totalPorMetododx, metododx.length),
    });
  });

  return datos;
};

/** Datos del archivo CSV
 * 0 => Fecha_corte
 * 1 => UUID
 * 2 => Departamento
 * 3 => Provincia
 * 4 => Distrito
 * 5 => Metododx
 * 6 => Edad
 * 7 => Sexo
 * 8 => Fecha_resultado
 */

module.exports = {
  crearCasosPositivos,
};
