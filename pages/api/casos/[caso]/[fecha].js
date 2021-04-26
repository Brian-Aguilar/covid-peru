import { obtenerCasoPorFecha } from "../../../../utils/caso";

export default (req, res) => {
  const {
    method,
    query: { caso, fecha },
  } = req;

  if (method === "GET") {
    obtenerCasoPorFecha(caso, fecha, res);
  } else {
    res.status(404).json({ status: 404, message: "ruta no econtrada" });
  }
};
