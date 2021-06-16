import dynamic from "next/dynamic";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { FechasContext } from "../../context/fechasContext";
import useFechaPorCaso from "../../hooks/fechasCasosHook";
import { urlApi } from "../../utils/urls";

import ListasCard from "../../components/Card/listas";
import FechasPorCasos from "../../components/Fechas/casos";
import CasosTable from "../../components/Table/casos";
import { CargarDatosContext } from "../../context/cargarDatosContext";
import Mensaje from "../../components/Mensaje";

const Mapa = dynamic(() => import("../../components/Mapa"), { ssr: false });

const mensajeVacuna =
  "Por el momento funciona hasta la fecha 2 de Junio del 2021.";

export default function Casos(props) {
  const { url, metadatos } = props;
  const { totalDeFechas } = useContext(FechasContext);
  const { setCargandoDatos } = useContext(CargarDatosContext);
  const { fechas, fecha, selectValue, datoPorFecha, isLoading } =
    useFechaPorCaso(url, totalDeFechas);

  useEffect(() => {
    setCargandoDatos(isLoading);
  }, [isLoading]);

  return (
    <>
      <Head>
        <title>COVID-19 Perú: Casos {url}</title>
        <meta name="description" content={metadatos} />
        <meta
          name="keywords"
          content={`covid peru ${url}, covid19 peru ${url}, covid-19 peru ${url}`}
        />
        <meta name="robots" content="index, follow" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`COVID-19 Perú: Casos ${url}`} />
        <meta name="twitter:description" content={metadatos} />
        <meta
          name="twitter:image"
          content="https://covid-peru.vercel.app/logo.png"
        />

        <meta name="og:title" content={`COVID-19 Perú: Casos ${url}`} />
        <meta name="og:type" content="website" />
        <meta property="og:url" content="https://covid-peru.vercel.app/" />
        <meta
          property="og:image"
          content="https://covid-peru.vercel.app/logo.png"
        />
        <meta property="og:site_name" content={`COVID-19 Perú: Casos ${url}`} />

        <meta itemProp="name" content={`COVID-19 Perú: Casos ${url}`} />
        <meta itemProp="description" content={metadatos} />
        <meta
          itemProp="image"
          content="https://covid-peru.vercel.app/logo.png"
        />
      </Head>

      {datoPorFecha !== null && (
        <>
          {url === "vacunados" && (
            <Mensaje texto={mensajeVacuna} color="celeste" />
          )}

          <FechasPorCasos
            caso={url}
            fechas_totales={fechas}
            fecha_seleccionada={fecha}
            dato_fecha={datoPorFecha}
            selectValue={selectValue}
          />
          <div className="mapa-tabla">
            <div className="tabla">
              <CasosTable data={datoPorFecha.departamentos} />
            </div>
            <div className="mapa">
              <Mapa data={datoPorFecha.departamentos} />
            </div>
          </div>

          <ListasCard titulo="Edades" datos={datoPorFecha.edades} />
          {url === "vacunados" && (
            <>
              <ListasCard
                titulo="Fabricantes"
                datos={datoPorFecha.fabricantes}
              />
              <ListasCard titulo="Dosis" datos={datoPorFecha.dosis} />
              <ListasCard
                titulo="Grupo de Riesgo"
                datos={datoPorFecha.grupo_riesgo}
              />
            </>
          )}
          <ListasCard titulo="Generos" datos={datoPorFecha.genero} />
          {url === "positivos" && (
            <ListasCard titulo="Metodo" datos={datoPorFecha.metododx} />
          )}
        </>
      )}

      <style jsx>{`
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
        @media (min-width: 768px) {
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
      `}</style>
    </>
  );
}
export async function getServerSideProps(context) {
  const {
    params: { caso },
    res,
  } = context;

  const { status, data } = await fetch(
    `${urlApi}/api/casos/${caso}/metadatos`
  ).then((datos) => datos.json());

  if (status === 200) {
    return {
      props: {
        url: caso,
        metadatos: data,
      },
    };
  }
  if (res) {
    res.writeHead(301, { location: "/" }).end();
  }
}
