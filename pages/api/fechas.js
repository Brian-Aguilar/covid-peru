export default async (req, res) => {
  const data = require("../../data/fechas.json");
  const { method } = req;

  if (method === "GET") {
    res.status(200).json({ status: 200, data });
  } else {
    res.status(404).json({ status: 404, message: "ruta no encontrada" });
  }
};
