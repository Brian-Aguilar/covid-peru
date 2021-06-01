import Head from "next/head";
import { CargarDatosProvider } from "../context/cargarDatosContext";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { FechasProvider } from "../context/fechasContext";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CargarDatosProvider>
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Navbar />
        <FechasProvider>
          <main>
            <Component {...pageProps} />
          </main>
        </FechasProvider>

        <Footer />
      </CargarDatosProvider>

      <style jsx>{`
        :global(:root) {
          --amarillo: 254, 206, 0;
          --anaranjado: 255, 131, 78;
          --azul: 82, 104, 231;
          --blanco: 255, 255, 255;
          --celeste: 82, 186, 231;
          --gris: 129, 124, 155;
          --negro: 26, 16, 83;
          --rojo: 249, 52, 94;
          --verde: 28, 177, 66;
        }
        :global(*) {
          box-sizing: border-box;
        }

        :global(html),
        :global(body) {
          color: rgb(var(--negro));
          font-family: -apple-system, "Poppins", BlinkMacSystemFont, Segoe UI,
            Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
          font-size: 16px;
          margin: 0;
          max-height: 100vh;
        }

        :global(h1),
        :global(h2),
        :global(h3),
        :global(h4),
        :global(h5),
        :global(h6),
        :global(a),
        :global(button),
        :global(input) {
          color: inherit;
          font-family: inherit;
        }

        :global(.shadow) {
          box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5);
        }
        :global(.shadow-hover:hover) {
          box-shadow: 0 7px 30px -2px rgba(150, 170, 180, 0.5);
        }

        :global(.scrollbar) {
          scrollbar-width: thin;
          scrollbar-color: rgb(var(--blanco)) rgba(var(--rojo), 0.5);
        }
        :global(.scrollbar::-webkit-scrollbar) {
          -webkit-appearance: none;
          background-color: rgb(var(--rojo));
          position: absolute;
          width: 8px;
        }
        :global(.scrollbar::-webkit-scrollbar-thumb) {
          border-radius: 8px;
          border: 1px solid rgb(var(--rojo));
          background-color: rgb(var(--blanco));
        }

        :global(.scrollbar::-webkit-resizer) {
          display: none;
        }

        main {
          padding: 2em 1em;
        }
      `}</style>
    </>
  );
}

export default MyApp;
