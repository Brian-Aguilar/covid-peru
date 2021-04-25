export default async (req, res) => {
  const { method } = req;
  if (method === "GET") {
    res.status(200).json({ status: 200, message: "prueba para vercel" });
  } else {
    res.status(404).json({ status: 404, message: "ruta no encontrada" });
  }
};
