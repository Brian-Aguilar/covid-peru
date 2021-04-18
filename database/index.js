const { crearCasosFallecidos } = require("./casos/fallecidos");
const { crearCasosPositivos } = require("./casos/positivos");
const { crearSalaSituacional } = require("./casos/sala_situacional");
const { crearCasosVacunados } = require("./casos/vacunados");
const { fechaEsCompleta } = require("./utilidades/fechas");

(async () => {
  const fecha = new Date();
  const fechaCompleta = fechaEsCompleta(
    fecha.getDate() - 1,
    fecha.getMonth() + 1,
    fecha.getFullYear()
  );
  await crearSalaSituacional(fechaCompleta);
  // crear casos
  await crearCasosPositivos();
  await crearCasosFallecidos();
  await crearCasosVacunados();
})();
