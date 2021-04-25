// import * as path from "path";
// import { leerArchivo } from "../../database/utilidades/archivos";

import data from "../../data/fechas.json";

// const url = path.join(__dirname, "/data/fechas.json");
// const url = "./data/fechas.json";

export default async (req, res) => {
  const { method } = req;

  // const data = await leerArchivo(url, true);

  if (method === "GET") {
    res.status(200).json({ status: 200, data: data });
  } else {
    res.status(404).json({ status: 404, message: "ruta no encontrada" });
  }
};
