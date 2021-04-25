import { useEffect } from "react";
import { convertirPorcentaje, formatearNumeros } from "../../utils/numeros";
import Card from "./";

const verificarNombres = (nombre) => {
  switch (nombre) {
    case "undefined":
      return "Sin definir";
    case "f":
      return "Femenino";
    case "m":
      return "Masculino";
    case "pr":
      return "Pruebas Rapidas";
    case "ag":
      return "Prueba Antígena";
    case "pcr":
      return "Prueba Molecular";

    default:
      return nombre;
  }
};

export default function ListasCard({ datos, titulo }) {
  useEffect(() => {}, [datos]);
  return (
    <>
      <div className="lista-cards">
        <h2>{titulo}:</h2>
        <div className="lista-contenido">
          {datos?.map((d) => (
            <Card key={`${titulo}-${d.nombre}`}>
              <h3 className="titulo">{verificarNombres(d.nombre)}</h3>
              <h2 className="sub-titulo">{formatearNumeros(d.casos)}</h2>
              <span className="porcentaje">
                {convertirPorcentaje(d.porcentaje)}
              </span>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        .lista-cards h2 {
          font-size: 2.5rem;
          text-transform: capitalize;
        }
        .lista-contenido {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }
      `}</style>
    </>
  );
}
