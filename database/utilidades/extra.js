const minusculas = (string) => {
  return `${string}`.toLowerCase();
};

const convertirGenero = (genero) => {
  switch (genero) {
    case "FEMENINO":
      return "f";
    case "MASCULINO":
      return "m";
  }
};

const porcentaje = (numero, total) => {
  return parseFloat(numero / total);
};

module.exports = {
  minusculas,
  convertirGenero,
  porcentaje,
};
