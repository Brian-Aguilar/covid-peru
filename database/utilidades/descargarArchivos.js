const cp = require("child_process");
const fetch = require("node-fetch");
const { obtenerURLDelCaso } = require("./nombre");

const obtenerUrlDelCaso = async (caso) => {
  const url = obtenerURLDelCaso(caso);
  const configuracion = {
    method: "GET",
  };

  try {
    const resultado = await fetch(url, configuracion).then(async (res) => {
      if (res.status === 200) {
        const { result } = await res.json();
        return {
          status: res.status,
          url: result[0].resources[0].url,
        };
      }

      return { status: res.status };
    });
    return resultado;
  } catch (error) {
    console.log("Error en el servidor.");
    return { status: 0 };
  }
};

const descargarArchivoCSV = async (url, nombreDelArchivo) => {
  let comando = `curl -o ${nombreDelArchivo} "${url}"`;
  cp.execSync(comando, { stdio: "inherit" });
};

module.exports = {
  obtenerUrlDelCaso,
  descargarArchivoCSV,
};
