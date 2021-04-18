const ordernarDatosAscendente = (datos, index) => {
  return datos.sort((a, b) => {
    if (a[index] > b[index]) {
      return 1;
    }
    if (a[index] < b[index]) {
      return -1;
    }
    return 0;
  });
};
const ordenarDatosDescendentes = (datos, index) => {
  return datos.sort((a, b) => {
    if (a[index] < b[index]) {
      return 1;
    }
    if (a[index] > b[index]) {
      return -1;
    }
    return 0;
  });
};

const ordernarDatosEnterosAscendente = (datos, index) => {
  return datos.sort((a, b) => {
    if (parseInt(a[index]) > parseInt(b[index])) {
      return 1;
    }
    if (parseInt(a[index]) < parseInt(b[index])) {
      return -1;
    }
    return 0;
  });
};
const ordernarDatosEnterosDescendentes = (datos, index) => {
  return datos.sort((a, b) => {
    if (parseInt(a[index]) < parseInt(b[index])) {
      return 1;
    }
    if (parseInt(a[index]) > parseInt(b[index])) {
      return -1;
    }
    return 0;
  });
};

const filtrarDatosEspecificos = (datos, index) => {
  return datos.map((dato) => dato[index]);
};

const sumarDatosEnArray = (datos) => {
  return datos.reduce((oldvalue, newvalue) => {
    return oldvalue + newvalue;
  }, 0);
};

module.exports = {
  filtrarDatosEspecificos,
  ordenarDatosDescendentes,
  ordernarDatosAscendente,
  ordernarDatosEnterosAscendente,
  ordernarDatosEnterosDescendentes,
  sumarDatosEnArray,
};
