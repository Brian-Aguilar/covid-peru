const {
  minusculas,
  convertirGenero,
  porcentaje,
} = require("../utilidades/extra");
const { filtrarDatosEspecificos } = require("../utilidades/filtros");
const { CASO } = require("../utilidades/nombre");
const { crearCaso } = require("./base");

const crearCasosVacunados = async () => {
  await crearCaso(CASO.vacunado, filtrarCasosVacunados, datosExtras);
};

const filtrarCasosVacunados = (datos) =>
  datos.map((dato) => ({
    departamento: minusculas(dato["DEPARTAMENTO"]),
    diresa: minusculas(dato["DIRESA"]),
    distrito: minusculas(dato["DISTRITO"]),
    dosis: parseInt(dato["DOSIS"]),
    edad: parseInt(dato["EDAD"]),
    fabricantes: minusculas(dato["FABRICANTE"]),
    fecha: parseInt(dato["FECHA_VACUNACION"]),
    genero: convertirGenero(dato["SEXO"]),
    grupo_riesgo: minusculas(dato["GRUPO_RIESGO"]),
    provincia: minusculas(dato["PROVINCIA"]),
  }));

const datosExtras = (datos) => {
  const grupoDeRiesgoFiltrado = filtrarDatosEspecificos(datos, "grupo_riesgo");
  const dosisFiltrado = filtrarDatosEspecificos(datos, "dosis");
  const frabricantesFiltrado = filtrarDatosEspecificos(datos, "fabricantes");
  return {
    dosis: dosisCV(dosisFiltrado),
    fabricantes: fabricantesCV(frabricantesFiltrado),
    grupo_riesgo: grupoDeRiesgoCV(grupoDeRiesgoFiltrado),
  };
};

const grupoDeRiesgoCV = (grupo_riesgo) => {
  const total = grupo_riesgo.length;
  const datosDelGrupoDeRiesgo = [...new Set(grupo_riesgo)];
  let datos = [];
  datosDelGrupoDeRiesgo.forEach((gr) => {
    const totalGrupoDeRiesgo = grupo_riesgo.filter((g) => g === gr).length;
    datos.push({
      nombre: `${gr}`,
      casos: totalGrupoDeRiesgo,
      porcentaje: porcentaje(totalGrupoDeRiesgo, total),
    });
  });
  return datos;
};
const dosisCV = (dosis) => {
  const total = dosis.length;
  const datosDosis = [...new Set(dosis)];
  let datos = [];
  datosDosis.forEach((d) => {
    const totalDosis = dosis.filter((dos) => dos === d).length;
    datos.push({
      nombre: nombreDeDosis(d),
      casos: totalDosis,
      porcentaje: porcentaje(totalDosis, total),
    });
  });
  return datos;
};
const fabricantesCV = (fabricantes) => {
  const total = fabricantes.length;
  const datosFabricantes = [...new Set(fabricantes)];
  let datos = [];
  datosFabricantes.forEach((f) => {
    const totalFabricantes = fabricantes.filter((fa) => fa === f).length;
    datos.push({
      nombre: f,
      casos: totalFabricantes,
      porcentaje: porcentaje(totalFabricantes, total),
    });
  });
  return datos;
};

const nombreDeDosis = (numero) => {
  switch (parseInt(numero)) {
    case 1:
      return "primera";
    case 2:
      return "segunda";
    default:
      return "";
  }
};

/** Datos del archivo CSV
 * 0 => Fecha_corte
 * 1 => UUID
 * 2 => Grupo_riesgo
 * 3 => Edad
 * 4 => Sexo
 * 5 => Fecha_vacunacion
 * 6 => Dosis
 * 7 => Fabricante
 * 8 => Diresa
 * 9 => Departamento
 * 10 => Provincia
 * 11 => Distrito
 */

module.exports = {
  crearCasosVacunados,
};
