export const convertirFechaESaEU = (fecha, signo = "/") => {
  const dia = fecha.slice(0, 2);
  const mes = fecha.slice(2, 4);
  const año = fecha.slice(4);
  return `${año}${signo}${mes}${signo}${dia}`;
};
