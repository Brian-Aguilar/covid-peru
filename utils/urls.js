const urlLocal = "http://localhost:3000";
const urlIP = "http://192.168.1.9:3000";
const urlWeb = urlLocal;

export const urlApi = process.env.NODE_ENV ? urlLocal : urlWeb;
// export const urlApi = urlIP;
