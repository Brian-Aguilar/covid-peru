import { obtenerUltimoDato } from "../../../../utils/caso";

export default (req, res) => {
  const {
    method,
    query: { caso },
  } = req;

  if (method === "GET") {
    obtenerUltimoDato(caso, res, null, true);
  } else {
    res.status(404).json({ status: 404, message: "ruta no econtrada" });
  }
};
