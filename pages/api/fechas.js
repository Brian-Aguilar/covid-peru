import * as path from "path";

import { leerArchivo } from "../../database/utilidades/archivos";

const urlData =
  process.env.NODE_ENV === "development"
    ? "./data/fechas.json"
    : path.join(__dirname, "/data/fechas.json");

export default async (req, res) => {
  const { method } = req;

  console.log(process.env.NODE_ENV);
  console.log(urlData);

  const data = leerArchivo(urlData, true);

  if (method === "GET") {
    res.status(200).json({ status: 200, data: data });
  } else {
    res.status(404).json({ status: 404, message: "ruta no encontrada" });
  }
};
