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
  const casoPositivo = CASO.positivo;
  await crearCaso(casoPositivo, filtrarCasosPositivos, datosExtras);
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
  const total = metododx.length;
  const datosDelMetododx = [...new Set(metododx)];
  let datos = [];
  datosDelMetododx.forEach((metodo) => {
    const totalPorMetododx = metododx.filter((m) => m === metodo).length;
    datos.push({
      nombre: `${metodo}`,
      casos: totalPorMetododx,
      porcentaje: porcentaje(totalPorMetododx, total),
    });
  });

  return datos;
};

module.exports = {
  crearCasosPositivos,
};
