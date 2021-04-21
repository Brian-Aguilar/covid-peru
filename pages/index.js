import Head from "next/head";

import useFechasSS from "../hooks/fechasSalaSituacionalHook";

import Card from "../components/Card";
import SeleccionarFechas from "../components/Fechas";

const numeros = (numero) => {
  return numero === undefined
    ? "cargando..."
    : Intl.NumberFormat("eu").format(numero);
};

export default function Home() {
  const { fechas, fecha, selectValue, datoPorFecha } = useFechasSS();

  return (
    <>
      <Head>
        <title>COVID-19: Perú</title>
      </Head>

      <div className="contenido">
        {/* Falta visualizar datos en tabal : react-table */}
        <div className="contenido-i">
          <Card>
            <h3 className="titulo">Positivos</h3>
            <h2 className="sub-titulo">{numeros(datoPorFecha?.positivos)}</h2>
          </Card>
          <Card>
            <h3 className="titulo">Fallecidos</h3>
            <h2 className="sub-titulo">{numeros(datoPorFecha?.fallecidos)}</h2>
          </Card>
        </div>
        <div className="contenido-d">
          <SeleccionarFechas
            fechas={fechas}
            fecha={fecha}
            selectValue={selectValue}
          />
        </div>
      </div>
      <div className="contenido-2">
        <Card>
          <h3 className="titulo">Pruebas Antígenas:</h3>
          <h2 className="sub-titulo">{numeros(datoPorFecha?.pa)}</h2>
        </Card>
        <Card>
          <h3 className="titulo">Pruebas Moleculares:</h3>
          <h2 className="sub-titulo">{numeros(datoPorFecha?.pcr)}</h2>
        </Card>
        <Card>
          <h3 className="titulo">Pruebas Rapidas:</h3>
          <h2 className="sub-titulo">{numeros(datoPorFecha?.pr)}</h2>
        </Card>
      </div>

      <style jsx>{`
        .contenido {
          display: flex;
          flex-direction: column-reverse;
        }
        .contenido-i {
          flex: 2;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5em;
          flex-wrap: wrap;
        }
        .contenido-d {
          flex: 1 1 auto;
        }
        .contenido-2 {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }
        .titulo {
          font-size: 1.75rem;
          margin-bottom: 0;
          font-weight: 400;
        }
        .sub-titulo {
          font-size: 2rem;
          font-weight: 600;
        }

        @media (min-width: 1400px) {
        }

        @media (min-width: 1200px) {
          .contenido-i {
            flex: 3;
            flex-direction: row;
            justify-content: space-around;
          }
        }
        @media (min-width: 992px) {
          .contenido-2 {
            margin-top: 1.75em;
          }
        }

        @media (min-width: 768px) {
          .contenido {
            flex-direction: row;
          }
        }
      `}</style>
    </>
  );
}
