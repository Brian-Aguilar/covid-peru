const fs = require("fs");

const crearArchivo = (nombre, datos, convertirJsonAString) => {
  if (convertirJsonAString === true) {
    fs.writeFileSync(nombre, JSON.stringify(datos));
  } else {
    fs.writeFileSync(nombre, datos);
  }
};

const crearCarpeta = (año) => {
  fs.mkdirSync(año);
};

const eliminarArchivo = (nombre) => {
  fs.rmSync(nombre);
};

const existeArchivo = (nombre) => {
  return fs.existsSync(nombre);
};

const leerArchivo = (nombre, obtenerJson) => {
  if (obtenerJson === true) {
    return JSON.parse(fs.readFileSync(nombre).toString());
  } else {
    return fs.readFileSync(nombre).toString();
  }
};

module.exports = {
  crearArchivo,
  crearCarpeta,
  eliminarArchivo,
  existeArchivo,
  leerArchivo,
};
