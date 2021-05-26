const fetch = require("node-fetch");
const { obtenerURLDelCaso } = require("./nombre");

const obtenerUrlDelCaso = async (caso) => {
  const url = obtenerURLDelCaso(caso);
  const configuracion = {
    method: "GET",
    headers: {
      Accept:
        "	text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0",
      "Cache-Control": "no-cache",
    },
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

module.exports = {
  obtenerUrlDelCaso,
};
