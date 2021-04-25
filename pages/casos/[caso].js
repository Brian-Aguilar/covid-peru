import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect } from "react";
import ListasCard from "../../components/Card/listas";
import Cargando from "../../components/Cargando";
import FechasPorCasos from "../../components/Fechas/casos";
import CasosTable from "../../components/Table/casos";
import useFechaPorCaso from "../../hooks/fechasCasosHook";

const Mapa = dynamic(() => import("../../components/Mapa"), { ssr: false });

const fechaInitial = {
  id: 0,
  fecha: "Ultima Actualización",
  fecha_convertir: "Ultima Actualización",
};

export default function Casos(props) {
  const { url, fechas_totales } = props;
  const fechasTotales = [fechaInitial, ...fechas_totales];

  const {
    fechas,
    fecha,
    setFecha,
    selectValue,
    datoPorFecha,
    isLoading,
  } = useFechaPorCaso(url, fechasTotales, fechaInitial);

  useEffect(() => {
    setFecha(fechaInitial);
  }, [url]);

  return (
    <>
      <Head>
        <title>Casos {url}</title>
      </Head>

      {datoPorFecha && (
        <>
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

      <Cargando isActive={isLoading} />

      <style jsx>{`
        .mapa-tabla {
          display: flex;
          width: 100%;
          flex-direction: column;
          margin-top: 2em;
        }
        .tabla {
          flex: 1 1 auto;
        }
        @media (min-width: 768px) {
          .mapa-tabla {
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
export async function getServerSideProps(context) {
  const {
    params: { caso },
    res,
  } = context;

  const { status, data: fechas } = await fetch(
    "http://localhost:3000/api/fechas"
  ).then((datos) => datos.json());

  if (status === 200) {
    return {
      props: {
        url: caso,
        fechas_totales: fechas,
      },
    };
  }
  if (res) {
    res.writeHead(301, { location: "/" }).end();
  }
}
