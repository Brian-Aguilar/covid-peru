const urlLocal = "http://localhost:3000";
const urlWeb = "https://covid-peru.vercel.app";

export const urlApi =
  process.env.NODE_ENV === "development" ? urlLocal : urlWeb;
