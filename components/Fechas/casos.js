import { useEffect } from "react";
import SeleccionarFechas from ".";
import { formatearNumeros } from "../../utils/numeros";
import Icons from "../Icons";

export default function FechasPorCasos({
  caso,
  fecha_seleccionada,
  fechas_totales,
  dato_fecha,
  selectValue,
}) {
  useEffect(() => {}, [caso, fecha_seleccionada]);
  return (
    <>
      <div className="fechas-casos">
        <div className="fechas">
          <div className="ultima-fecha">
            <h1>{formatearNumeros(dato_fecha.total)}</h1>
            <h4>{dato_fecha.ultima_fecha_es}</h4>
          </div>
          <div className="penultima-fecha">
            <h2 className={`${caso}`}>
              <Icons tipo="flecha-arriba" /> +
              {formatearNumeros(dato_fecha.diferencia_total)}
            </h2>
            <h4>{dato_fecha.penultima_fecha_es}</h4>
          </div>
        </div>
        <span className="ultima-actualizacion">
          <SeleccionarFechas
            fechas={fechas_totales}
            fecha={fecha_seleccionada}
            selectValue={selectValue}
            caso={caso}
          />
        </span>
      </div>

      <style jsx>{`
        .fechas-casos {
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
        }
        .fechas {
          display: flex;
          align-items: flex-end;
          padding: 1em 2em;
        }
        .ultima-fecha,
        .penultima-fecha {
          display: flex;
          flex-direction: column;
          align-items: space-around;
        }
        .penultima-fecha {
          margin-left: 1em;
        }
        .ultima-actualizacion {
          font-size: 2rem;
        }
        .penultima-fecha h2 {
          color: rgb(var(--rojo));
        }
        .penultima-fecha h2.vacunados {
          color: rgb(var(--verde));
        }

        h1,
        h2,
        h4 {
          text-align: center;
          margin: 0;
        }
        h4 {
          margin-top: 0.5em;
          color: rgba(var(--negro), 0.5);
        }

        @media (min-width: 768px) {
          .fechas-casos {
            flex-direction: row;
            justify-content: space-between;
          }
        }
      `}</style>
    </>
  );
}
