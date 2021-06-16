import { memo, useEffect } from "react";
import { convertirFechaESaEU } from "../../utils/fecha";

function SeleccionarFechas({ fechas, fecha, selectValue, caso }) {
  useEffect(() => {
    if (caso !== undefined) {
      selectValue({
        target: {
          value: "Ultima Actualización",
        },
      });
    }
  }, [caso]);
  return (
    <>
      <div className="__SF-fechas-contenido">
        <h4>Fecha Seleccionada: </h4>
        <select onChange={selectValue} value={fecha.fecha}>
          {fechas.length === 0 ? (
            <option value="cargando...">cargando...</option>
          ) : (
            fechas
              .filter((f) => {
                if (
                  caso === "vacunados" &&
                  ((parseInt(convertirFechaESaEU(f.fecha, "")) >= 20210209 &&
                    parseInt(convertirFechaESaEU(f.fecha, "")) <= 20210602) ||
                    f.fecha === "Ultima Actualización")
                ) {
                  return f;
                } else if (
                  caso === "fallecidos" ||
                  caso === "positivos" ||
                  caso === undefined
                ) {
                  return f;
                }
              })
              .map((fecha) => (
                <option key={fecha.id} value={fecha.fecha}>
                  {fecha.fecha_convertir}
                </option>
              ))
          )}
        </select>
      </div>
      <style jsx>{`
        .__SF-fechas-contenido {
          max-width: 500px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          margin-bottom: 1em;
        }
        h4 {
          margin-top: 0;
        }
        select {
          padding: 0.5em;
          font-size: 1.5rem;
          border: 1px solid rgb(var(--negro));
          border-radius: 8px;
          outline: none;
        }
      `}</style>
    </>
  );
}

export default memo(SeleccionarFechas);
