import Head from "next/head";
import dynamic from "next/dynamic";
import { useContext, useEffect } from "react";

import { FechasContext } from "../context/fechasContext";
import { CargarDatosContext } from "../context/cargarDatosContext";
import { urlApi } from "../utils/urls";
import useFechasSS from "../hooks/fechasSalaSituacionalHook";

import Card from "../components/Card";
import SeleccionarFechas from "../components/Fechas";
import SalaSituacionalTable from "../components/Table/sala_situacional";
const Mapa = dynamic(() => import("../components/Mapa"), { ssr: false });
import { formatearNumeros } from "../utils/numeros";

export default function Home(props) {
  const { metadatos } = props;
  const { totalDeFechas } = useContext(FechasContext);
  const { setCargandoDatos } = useContext(CargarDatosContext);
  const { fechas, fecha, selectValue, datoPorFecha, isLoading } =
    useFechasSS(totalDeFechas);

  useEffect(() => {
    setCargandoDatos(isLoading);
  }, [isLoading]);

  return (
    <>
      <Head>
        <title>COVID-19 Perú</title>
        <meta name="description" content={metadatos} />
        <meta
          name="keywords"
          content="covid peru, covid19 peru, covid-19 peru, covid19 peru hoy, covid-19 peru hoy"
        />
        <meta name="robots" content="index, follow" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="COVID-19 Perú" />
        <meta name="twitter:description" content={metadatos} />
        <meta
          name="twitter:image"
          content="https://covid-peru.vercel.app/logo.png"
        />

        <meta name="og:title" content="COVID-19 Perú" />
        <meta name="og:type" content="website" />
        <meta property="og:url" content="https://covid-peru.vercel.app/" />
        <meta
          property="og:image"
          content="https://covid-peru.vercel.app/logo.png"
        />
        <meta property="og:site_name" content="COVID-19 Perú" />

        <meta itemProp="name" content="COVID-19 Perú" />
        <meta itemProp="description" content={metadatos} />
        <meta
          itemProp="image"
          content="https://covid-peru.vercel.app/logo.png"
        />
      </Head>

      {datoPorFecha !== null && (
        <>
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
              <h2 className="sub-titulo">
                {formatearNumeros(datoPorFecha.pa)}
              </h2>
            </Card>
            <Card>
              <h3 className="titulo">Pruebas Moleculares:</h3>
              <h2 className="sub-titulo">
                {formatearNumeros(datoPorFecha.pcr)}
              </h2>
            </Card>
            <Card>
              <h3 className="titulo">Pruebas Rapidas:</h3>
              <h2 className="sub-titulo">
                {formatearNumeros(datoPorFecha.pr)}
              </h2>
            </Card>
          </div>
          <div className="mapa-tabla">
            <div className="tabla">
              <SalaSituacionalTable data={datoPorFecha.datos} />
            </div>
            <div className="mapa">
              <Mapa data={datoPorFecha.datos} sala={true} />
            </div>
          </div>
        </>
      )}

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
          width: 100%;
          margin-top: 2em;
          display: grid;
        }
        .tabla {
          grid-column: auto;
          overflow-x: hidden;
        }
        .mapa {
          width: 100%;
          align-items: center;
          grid-column: auto;
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
          .mapa-tabla {
            grid-template-columns: repeat(3, 1fr);
          }
          .tabla {
            grid-column: 1/3;
          }
          .mapa {
            grid-column: 3/4;
            min-height: 500px;
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

export async function getServerSideProps(__) {
  const { data } = await fetch(
    `${urlApi}/api/casos/sala-situacional/metadatos`
  ).then((datos) => datos.json());
  return {
    props: {
      metadatos: data,
    },
  };
}
