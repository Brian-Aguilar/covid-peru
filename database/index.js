"use strict";

const { crearSalaSituacional } = require("./casos/sala_situacional");
const { crearCasosFallecidos } = require("./casos/fallecidos");
const { crearCasosPositivos } = require("./casos/positivos");
const { crearCasosVacunados } = require("./casos/vacunados");
const { disminuirFecha, fechaEUCompleta } = require("./utilidades/fechas");

(async () => {
  const fecha = new Date();
  const fechaCompleta = fechaEUCompleta(
    fecha.getFullYear(),
    fecha.getMonth() + 1,
    fecha.getDate()
  );
  await crearSalaSituacional(disminuirFecha(fechaCompleta, 1));
  // crear casos
  await crearCasosPositivos();
  await crearCasosFallecidos();
  await crearCasosVacunados();
})();
