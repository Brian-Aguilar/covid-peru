import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";

import departamentos from "../../database/utilidades/departamentos";

export const crearMapa = (departamento, sala = false) => {
  let departamentosFiltrados = [];
  if (sala) {
    departamentosFiltrados = departamentos.map((d) => {
      const dep = departamento.filter(
        (dp) =>
          dp.departamento === d.nombre ||
          dp.departamento === d.nombre_original.toLowerCase()
      )[0];
      return { ...d, ...dep };
    });
  } else {
    departamentosFiltrados = departamentos.map((d) => {
      const dep = departamento.filter(
        (dp) =>
          dp.nombre === d.nombre ||
          dp.nombre === d.nombre_original.toLowerCase()
      )[0];
      return { ...d, ...dep };
    });
  }
  let mapa = am4core.create("chartdiv", am4maps.MapChart);
  mapa.geodataSource.url = "/mapa/peru.json";
  mapa.projection = new am4maps.projections.Miller();

  let polygonSeries = mapa.series.push(new am4maps.MapPolygonSeries());
  polygonSeries.useGeodata = true;

  mapa.geodataSource.events.on("parseended", function () {
    let data = [];
    departamentosFiltrados.forEach((dep) => {
      let datosExtra = {};
      const datosBase = {
        id: dep.id,
        name: dep.nombre_original,
        value: dep.positivos || dep.casos,
      };
      if (sala) {
        datosExtra = {
          positivos: `P: ${dep.positivos}`,
          fallecidos: `F: ${dep.fallecidos},`,
          pa: `P.A: ${dep.pa},`,
          pcr: `P.C.R: ${dep.pcr},`,
          pr: `P.R: ${dep.pr},`,
        };
      }

      data.push({
        ...datosBase,
        ...datosExtra,
      });
    });
    polygonSeries.data = data;
  });

  polygonSeries.heatRules.push({
    property: "fill",
    target: polygonSeries.mapPolygons.template,
    min: am4core.color("rgba(249,52,94,0.2)"),
    max: am4core.color("rgba(249,52,94,0.8)"),
  });

  let polygonTemplate = polygonSeries.mapPolygons.template;
  polygonTemplate.tooltipText =
    "{name}: {value}\n{positivos}\n{fallecidos}\n{pa}\n{pcr}\n{pr}";
  polygonTemplate.nonScalingStroke = true;
  polygonTemplate.strokeWidth = 0.5;
  polygonTemplate.fill = mapa.colors.getIndex(0).lighten(0.5);

  let hs = polygonTemplate.states.create("hover");
  hs.properties.fill = am4core.color("rgb(249,52,94)");

  // let imageSeries = mapa.series.push(new am4maps.MapImageSeries());
  // imageSeries.mapImages.template.propertyFields.longitude = "longitude";
  // imageSeries.mapImages.template.propertyFields.latitude = "latitude";
  // imageSeries.mapImages.template.tooltipText = "{title}: {value}";
  // imageSeries.mapImages.template.propertyFields.url = "url";
  // imageSeries.mapImages.template.fill = am4core.color("rgba(249,52,94,0.4)");

  // let circle = imageSeries.mapImages.template.createChild(am4core.Circle);
  // circle.radius = 3;
  // circle.propertyFields.fill = "color";

  // let circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
  // circle2.radius = 3;
  // circle2.propertyFields.fill = "color";
  // circle2.events.on("inited", function (event) {
  //   animateBullet(event.target);
  // });

  // var colorSet = new am4core.ColorSet();

  // if (Object.entries(departamento).length !== 0) {
  //   imageSeries.data = [{ ...departamento, color: colorSet.next() }];
  // }

  mapa.maxZoomLevel = 1;
  mapa.seriesContainer.draggable = false;
  mapa.seriesContainer.resizable = false;
  return mapa;
};

const animateBullet = (circle) => {
  let animation = circle.animate(
    [
      { property: "scale", from: 1, to: 10 },
      { property: "opacity", from: 1, to: 0 },
    ],
    1000,
    am4core.ease.circleInOut
  );

  animation.events.on("animationended", function (ev) {
    animateBullet(ev.target.object);
  });
};
