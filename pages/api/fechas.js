import * as path from "path";

import { leerArchivo } from "../../database/utilidades/archivos";

const urlData = process.env.NODE_ENV
  ? "./data/fechas.json"
  : path.resolve(__dirname, "/data/fechas.json");

export default async (req, res) => {
  const { method } = req;

  const data = leerArchivo(urlData, true);

  if (method === "GET") {
    res.status(200).json({ status: 200, data: data });
  } else {
    res.status(404).json({ status: 404, message: "ruta no encontrada" });
  }
};
