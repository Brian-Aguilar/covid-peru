const { convertirGenero, minusculas } = require("../utilidades/extra");
const { CASO } = require("../utilidades/nombre");
const { crearCaso } = require("./base");

const crearCasosFallecidos = async () => {
  const casoFallecidos = CASO.fallecido;
  await crearCaso(casoFallecidos, filtrarCasosFallecidos);
};

const filtrarCasosFallecidos = (datos) =>
  datos.map((dato) => ({
    departamento: minusculas(dato[6]),
    distrito: minusculas(dato[7]),
    edad: parseInt(dato[3]),
    fecha: parseInt(dato[2]),
    genero: convertirGenero(dato[4]),
    provincia: minusculas(dato[8]),
  }));

module.exports = {
  crearCasosFallecidos,
};
