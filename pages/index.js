import Head from "next/head";
import dynamic from "next/dynamic";

import useFechasSS from "../hooks/fechasSalaSituacionalHook";

import Card from "../components/Card";
import SeleccionarFechas from "../components/Fechas";
import SalaSituacionalTable from "../components/Table/sala_situacional";
import { formatearNumeros } from "../utils/numeros";
import Cargando from "../components/Cargando";
import { urlApi } from "../utils/urls";

const Mapa = dynamic(() => import("../components/Mapa"), { ssr: false });

export default function Home(props) {
  const { fechas_totales, ultima_fecha } = props;

  const { fechas, fecha, selectValue, datoPorFecha, isLoading } = useFechasSS(
    fechas_totales,
    ultima_fecha
  );

  return (
    <>
      <Head>
        <title>COVID-19: Perú</title>
      </Head>

      <div className="contenido">
        <div className="contenido-i">
          <Card>
            <h3 className="titulo">Positivos</h3>
            <h2 className="sub-titulo">
              {formatearNumeros(datoPorFecha?.positivos)}
            </h2>
          </Card>
          <Card>
            <h3 className="titulo">Fallecidos</h3>
            <h2 className="sub-titulo">
              {formatearNumeros(datoPorFecha?.fallecidos)}
            </h2>
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
          <h2 className="sub-titulo">{formatearNumeros(datoPorFecha?.pa)}</h2>
        </Card>
        <Card>
          <h3 className="titulo">Pruebas Moleculares:</h3>
          <h2 className="sub-titulo">{formatearNumeros(datoPorFecha?.pcr)}</h2>
        </Card>
        <Card>
          <h3 className="titulo">Pruebas Rapidas:</h3>
          <h2 className="sub-titulo">{formatearNumeros(datoPorFecha?.pr)}</h2>
        </Card>
      </div>

      {datoPorFecha.datos && (
        <div className="mapa-tabla">
          <div className="tabla">
            <SalaSituacionalTable data={datoPorFecha.datos} />
          </div>
          <div className="mapa">
            <Mapa data={datoPorFecha.datos} sala={true} />
          </div>
        </div>
      )}

      <Cargando isActive={isLoading} />

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

        .mapa-tabla {
          display: flex;
          width: 100%;
          flex-direction: column;
          margin-top: 2em;
        }
        .tabla {
          flex: 1 1 auto;
        }

        @media (min-width: 1400px) {
        }

        @media (min-width: 1200px) {
          .contenido-i {
            flex: 3;
            flex-direction: row;
            justify-content: space-around;
          }
          .mapa-tabla {
            flex-direction: row;
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

          .tabla {
            flex: 1 1 auto;
          }
          .mapa {
            flex: 1 1 auto;
            min-height: 500px;
          }
        }
      `}</style>
    </>
  );
}

export async function getServerSideProps(__) {
  const { data } = await fetch(`${urlApi}/api/fechas`).then((datos) =>
    datos.json()
  );
  return {
    props: {
      fechas_totales: data,
      ultima_fecha: data[0],
    },
  };
}
