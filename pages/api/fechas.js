import * as fs from "fs";

export default async (req, res) => {
  const { method } = req;

  const data = JSON.parse(fs.readFileSync("./data/fechas.json").toString());

  if (method === "GET") {
    res.status(200).json({ status: 200, data: data });
  } else {
    res.status(404).json({ status: 404, message: "ruta no encontrada" });
  }
};
