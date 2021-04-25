import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { useLayoutEffect, useRef } from "react";
import { crearMapa } from "./configuracion";

am4core.useTheme(am4themes_animated);

export default function Mapa({ data, sala }) {
  const mapa = useRef(null);

  useLayoutEffect(() => {
    let obtenerMapa = crearMapa(data, sala);
    mapa.current = obtenerMapa;
    return () => {
      obtenerMapa.dispose();
    };
  }, [data]);

  return (
    <>
      <div id="chartdiv" ref={mapa} className="mapa">
        mapa
      </div>
      <style jsx>{`
        .mapa {
          width: 100%;
          height: 500px;
          overflow: none;
        }
      `}</style>
    </>
  );
}
