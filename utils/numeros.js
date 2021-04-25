export const formatearNumeros = (numero) => {
  return numero === undefined
    ? "cargando..."
    : Intl.NumberFormat("en").format(numero);
};

export const convertirPorcentaje = (porcentaje) => {
  return porcentaje === undefined
    ? "cargando..."
    : Intl.NumberFormat("en", { style: "percent" }).format(porcentaje);
};
