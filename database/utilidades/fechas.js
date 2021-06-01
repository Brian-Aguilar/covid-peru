const convertirFechaEU = (fecha, signo = "/") => {
  const año = fecha.slice(0, 4);
  const mes = fecha.slice(4, 6);
  const dia = fecha.slice(6, 8);
  return `${año}${signo}${mes}${signo}${dia}`;
};
const convertirFechaES = (fecha, signo = "/") => {
  const dia = fecha.slice(0, 2);
  const mes = fecha.slice(2, 4);
  const año = fecha.slice(4);
  return `${dia}${signo}${mes}${signo}${año}`;
};
const convertirFechaESaEU = (fecha, signo = "/") => {
  const dia = fecha.slice(0, 2);
  const mes = fecha.slice(2, 4);
  const año = fecha.slice(4);
  return `${año}${signo}${mes}${signo}${dia}`;
};
const convertirFechaEUaES = (fecha, signo = "/") => {
  const dia = `${fecha}`.slice(6, 8);
  const mes = `${fecha}`.slice(4, 6);
  const año = `${fecha}`.slice(0, 4);
  return `${dia}${signo}${mes}${signo}${año}`;
};

const fechaEs = (fecha) => {
  const dia = fecha.slice(0, 2);
  const mes = fecha.slice(2, 4);
  const año = fecha.slice(4);
  return { dia, mes, año };
};
const fechaEsCompleta = (dia, mes, año) => {
  return `${formatearDiaOMes(dia)}${formatearDiaOMes(mes)}${año}`;
};
const fechaEU = (fecha) => {
  const dia = fecha.slice(6, 8);
  const mes = fecha.slice(4, 6);
  const año = fecha.slice(0, 4);
  return { dia, mes, año };
};
const fechaEUCompleta = (año, mes, dia) => {
  return `${año}${formatearDiaOMes(mes)}${formatearDiaOMes(dia)}`;
};

const formatearDiaOMes = (numero) => {
  return `${numero}`.padStart(2, 0);
};

const aumentarFecha = (fecha, aumentar = 0) => {
  const { dia, mes, año } = fechaEU(fecha);
  const datosDeLaFecha = new Date(año, mes, 0);
  const ultimoDiaDelMes = datosDeLaFecha.getDate();

  if (parseInt(dia) + aumentar > parseInt(ultimoDiaDelMes)) {
    if (parseInt(mes) === 12 && parseInt(dia) === parseInt(ultimoDiaDelMes)) {
      return fechaEUCompleta(
        parseInt(año) + 1,
        parseInt(mes) >= 12 ? 1 : parseInt(mes) + 1,
        1
      );
    }
    return fechaEUCompleta(año, parseInt(mes) >= 12 ? 1 : parseInt(mes) + 1, 1);
  }

  return `${año}${mes}${formatearDiaOMes(parseInt(dia) + aumentar)}`;
};

const disminuirFecha = (fecha, disminuir = 0) => {
  let { dia, mes, año } = fechaEU(fecha);

  if (parseInt(dia) - disminuir === 0) {
    const datosDeLaFecha = new Date(año, mes - 1, 0);
    dia = datosDeLaFecha.getDate();
    mes = datosDeLaFecha.getMonth() + 1;
  } else {
    dia = parseInt(dia) - disminuir;
  }
  return fechaEsCompleta(dia, mes, año);
};

module.exports = {
  aumentarFecha,
  convertirFechaES,
  convertirFechaESaEU,
  convertirFechaEU,
  convertirFechaEUaES,
  fechaEs,
  fechaEsCompleta,
  fechaEU,
  fechaEUCompleta,
  formatearDiaOMes,
  disminuirFecha,
};
