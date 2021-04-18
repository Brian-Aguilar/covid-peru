const {
  existeArchivo,
  leerArchivo,
  crearCarpeta,
  crearArchivo,
} = require("../utilidades/archivos");
const { porcentaje } = require("../utilidades/extra");
const {
  filtrarDatosEspecificos,
  ordernarDatosAscendente,
} = require("../utilidades/filtros");
const {
  obtenerNombreDelArchivoDeLaUltimaActualizacion,
  obtenerNombreDelArchivoPorFecha,
  obtenerTituloDelCaso,
} = require("../utilidades/nombre");
const totalDeDepartamentos = require("../utilidades/departamentos");
const { convertirFechaEUaES } = require("../utilidades/fechas");
const mensaje = require("../utilidades/console");

const crearUltimosDatos = async (
  caso,
  datos,
  ultima_fecha,
  extra,
  ss = false
) => {
  const total = datos.length;
  const nombreDelArchivo =
    ss === false
      ? obtenerNombreDelArchivoDeLaUltimaActualizacion(caso)
      : obtenerNombreDelArchivoPorFecha(
          convertirFechaEUaES(ultima_fecha, ""),
          caso
        );
  let crearNuevoArchivo = false;

  if (existeArchivo(nombreDelArchivo)) {
    const datosExistentes = leerArchivo(nombreDelArchivo, true);

    if (datosExistentes.total !== total) {
      crearNuevoArchivo = true;
    } else {
      crearNuevoArchivo = false;
    }
  } else {
    crearNuevoArchivo = true;
  }

  if (crearNuevoArchivo) {
    const ultimosCasos = await obtenerUltimosCasos(
      caso,
      ss === false ? ss : ss.penultima_fecha
    );
    const penultima_fecha =
      ultimosCasos.ultima_fecha === 0
        ? ultima_fecha
        : ultimosCasos.ultima_fecha;
    const penultimo_total =
      ultimosCasos.total === 0 ? total : ultimosCasos.total;
    let datosPorCasos = {
      ultima_fecha: ultima_fecha,
      ultima_fecha_es: convertirFechaEUaES(ultima_fecha),
      total: total,
      penultima_fecha: penultima_fecha,
      penultima_fecha_es: convertirFechaEUaES(penultima_fecha),
      penultimo_total: penultimo_total,
      diferencia_total: total - penultimo_total,
      departamentos: obtenerDatosPorDepartamentos(datos),
      genero: obtenerDatosPorGenero(datos),
      edades: obtenerDatosPorEdades(datos),
    };
    if (extra !== false) {
      datosPorCasos = { ...datosPorCasos, ...extra(datos) };
    }

    crearArchivo(nombreDelArchivo, datosPorCasos, true);
    mensaje(
      obtenerTituloDelCaso(caso),
      `${convertirFechaEUaES(ultima_fecha, "/")} se a creado.`
    );
  } else {
    if (ss === false) {
      mensaje(obtenerTituloDelCaso(caso), "no hay nigun dato para actualizar");
    }
  }
};

const obtenerUltimosCasos = async (caso, ss = false) => {
  if (ss !== false) {
    if (existeArchivo(`./data/${caso}`) === false) {
      crearCarpeta(`./data/${caso}`);
    }
  }
  const nombreDelArchivo =
    ss === false
      ? obtenerNombreDelArchivoDeLaUltimaActualizacion(caso)
      : obtenerNombreDelArchivoPorFecha(convertirFechaEUaES(ss, ""), caso);

  if (existeArchivo(nombreDelArchivo)) {
    return await leerArchivo(nombreDelArchivo, true);
  }
  return {
    ultima_fecha: 0,
    total: 0,
  };
};

const obtenerDatosPorDepartamentos = (datos) => {
  const departamentosFiltrados = filtrarDatosEspecificos(datos, "departamento");
  const provincasPorDepartamento = datos.map((d) => ({
    departamento: d.departamento,
    provincia: d.provincia,
  }));

  const total = departamentosFiltrados.length;
  const departamentos = [...new Set(departamentosFiltrados)];
  let totalDeDatos = [];
  departamentos.forEach((depa) => {
    const totalPorDepartamento = departamentosFiltrados.filter(
      (d) => d === depa
    ).length;
    const {
      id,
      longitud,
      latitud,
      nombre_original,
    } = totalDeDepartamentos.filter((d) => d.nombre === depa)[0];
    totalDeDatos.push({
      id,
      nombre: `${depa}`,
      nombre_original,
      casos: totalPorDepartamento,
      porcentaje: porcentaje(totalPorDepartamento, total),
      longitud,
      latitud,
      provincias: obtenerDatosPorProvincias(
        provincasPorDepartamento,
        `${depa}`
      ),
    });
  });

  return ordernarDatosAscendente(totalDeDatos, "nombre");
};

const obtenerDatosPorProvincias = (datos, departamento) => {
  const datosDeDepartamentosConSusProvincias = datos
    .filter((d) => d.departamento === departamento)
    .map((d) => d.provincia);

  const provincias = [...new Set(datosDeDepartamentosConSusProvincias)];
  let datoTotal = [];
  provincias.forEach((p) => {
    const total = datosDeDepartamentosConSusProvincias.filter((d) => d === p)
      .length;
    datoTotal.push({
      nombre: p,
      casos: total,
    });
  });
  return ordernarDatosAscendente(datoTotal, "nombre");
};

const obtenerDatosPorGenero = (datos) => {
  const generosFiltrados = filtrarDatosEspecificos(datos, "genero");
  const total = generosFiltrados.length;
  const generos = [...new Set(generosFiltrados)];
  let totalDeDatos = [];
  generos.forEach((genero) => {
    const totalPorGenero = generosFiltrados.filter((g) => g === genero).length;
    totalDeDatos.push({
      nombre: `${genero}`,
      casos: totalPorGenero,
      porcentaje: porcentaje(totalPorGenero, total),
    });
  });
  return totalDeDatos;
};

const obtenerDatosPorEdades = (datos) => {
  const edadesFiltradas = filtrarDatosEspecificos(datos, "edad");
  const total = edadesFiltradas.length;
  // console.dir([...new Set(edadesFiltradas)], { maxArrayLength: null });
  const niños = edadesFiltradas.filter((e) => e >= 0 && e <= 11).length;
  const adolescentes = edadesFiltradas.filter((e) => e >= 12 && e <= 17).length;
  const jovenes = edadesFiltradas.filter((e) => e >= 18 && e <= 29).length;
  const adultos = edadesFiltradas.filter((e) => e >= 30 && e <= 59).length;
  const adultos_mayores = edadesFiltradas.filter((e) => e >= 60).length;
  const sin_asignar = edadesFiltradas.filter((e) => isNaN(e)).length;
  return [
    {
      nombre: "niños",
      casos: niños,
      porcentaje: porcentaje(niños, total),
    },
    {
      nombre: "adolescentes",
      casos: adolescentes,
      porcentaje: porcentaje(adolescentes, total),
    },
    {
      nombre: "jovenes",
      casos: jovenes,
      porcentaje: porcentaje(jovenes, total),
    },
    {
      nombre: "adultos",
      casos: adultos,
      porcentaje: porcentaje(adultos, total),
    },
    {
      nombre: "adultos mayores",
      casos: adultos_mayores,
      porcentaje: porcentaje(adultos_mayores, total),
    },
    {
      nombre: "undefined",
      casos: sin_asignar,
      porcentaje: porcentaje(sin_asignar, total),
    },
  ];
};

module.exports = {
  crearUltimosDatos,
  obtenerUltimosCasos,
};
