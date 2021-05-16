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
    departamento: minusculas(dato[2]),
    distrito: minusculas(dato[4]),
    edad: parseInt(dato[6]),
    fecha_es_tipo: convertirFechaEUaES(`${dato[8]}`, "/"),
    fecha_es: convertirFechaEUaES(`${dato[8]}`, ""),
    fecha: parseInt(dato[8]),
    genero: convertirGenero(dato[7]),
    metododx: minusculas(dato[5]),
    provincia: minusculas(dato[3]),
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
