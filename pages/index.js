import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>COVID 19: Perú</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Hola mundo!!!</h1>

      <style jsx>{`
        h1 {
          color: rgb(var(--rojo));
        }
      `}</style>
    </>
  );
}
