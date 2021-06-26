const { convertirGenero, minusculas } = require("../utilidades/extra");
const { CASO } = require("../utilidades/nombre");
const { crearCaso } = require("./base");

const crearCasosFallecidos = async () => {
  await crearCaso(CASO.fallecido, filtrarCasosFallecidos);
};

const filtrarCasosFallecidos = (datos) =>
  datos.map((dato) => ({
    departamento: minusculas(dato["DEPARTAMENTO"]),
    distrito: minusculas(dato["DISTRITO"]),
    edad: parseInt(dato["EDAD_DECLARADA"]),
    fecha: parseInt(dato["FECHA_FALLECIMIENTO"]),
    genero: convertirGenero(dato["SEXO"]),
    provincia: minusculas(dato["PROVINCIA"]),
  }));

/** Datos del archivo CSV
 * 0 => Fecha_corte
 * 1 => UUID
 * 2 => Fecha_fallecido
 * 3 => Edad
 * 4 => Sexo
 * 5 => Fecha_nacimiento
 * 6 => Ubigeo
 * 7 => Departamento
 * 8 => Provincia
 * 9 => Distrito
 */

module.exports = {
  crearCasosFallecidos,
};
