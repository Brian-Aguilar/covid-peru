const { obtenerUltimoDatoPorCaso } = require("../../../../utils/caso");

export default (req, res) => {
  const {
    method,
    query: { caso },
  } = req;

  if (method === "GET") {
    const { status, data } = obtenerDatos(caso);
    if (status === 200) {
      return res.status(200).json({ status: 200, data });
    }
  }
  return res.status(404).json({ message: "Error no encontrado" });
};

const obtenerDatos = (caso) => {
  const data = obtenerUltimoDatoPorCaso(caso);
  if (caso === "sala-situacional") {
    const mensaje = `Ultima fecha registrada ${
      data.fecha
    } registro un total de ${data.data.positivos} casos positivos, ${
      data.data.fallecidos
    } casos fallecidos y ${
      data.data.pcr + data.data.pr + data.data.pa
    } en pruebas realizadas.`;
    return { status: 200, data: mensaje };
  }
  if (data !== "error") {
    const mensaje = `Ultima fecha registrada ${data.ultima_fecha_es} registro un total de ${data.total} casos ${caso}.`;
    return {
      status: 200,
      data: mensaje,
    };
  }
  return {
    status: 404,
    data: "No se pudo obtener datos",
  };
};
