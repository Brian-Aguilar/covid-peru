import Link from "next/link";
import Icons from "../Icons";

export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-top">
          <ul className="menu">
            <li>
              <Link href="/">
                <a>Inicio</a>
              </Link>
            </li>
            <li>
              <Link href="/casos/positivos">
                <a> Casos Positivos</a>
              </Link>
            </li>
            <li>
              <Link href="/casos/fallecidos">
                <a> Casos Fallecidos</a>
              </Link>
            </li>
            <li>
              <Link href="/casos/vacunados">
                <a> Casos Vacunados</a>
              </Link>
            </li>
          </ul>
          <div className="info">
            <h2>Recursos:</h2>
            <ul>
              <li>
                <a
                  target="_blank"
                  href="https://covid19.minsa.gob.pe/sala_situacional.asp"
                >
                  Sala Situacional
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.datosabiertos.gob.pe/search/field_topic/covid-19-917?sort_by=changed"
                >
                  Datos Abiertos Perú
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <a href="https://github.com/Brian-Aguilar/covid-peru" target="_blank">
            <span>
              <Icons tipo="github" width="2em" height="2em" />
            </span>
            <span>Codigo fuente de la página</span>
          </a>
        </div>
      </footer>

      <style jsx>{`
        footer {
          display: flex;
          flex-direction: column;
          background-color: rgba(var(--negro), 0.8);
          flex-wrap: wrap;
          padding: 1em 2em;
          color: rgb(var(--blanco));
        }

        .footer-top {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        .footer-top .menu {
          display: flex;
          flex-direction: column;
          list-style: none;
          padding-left: 0;
        }

        .footer-top .menu a,
        .info ul a {
          display: block;
          margin: 0.5em 1em;
          text-decoration: none;
          transition: transform 0.3s ease-out;
          transform: translateX(0);
        }
        .footer-top .menu li:hover a,
        .info ul li:hover a {
          transform: translateX(10px);
        }
        .info {
        }
        .info ul {
          padding-left: 0;
          list-style: numeric;
        }
        .footer-bottom {
          margin-top: 2em;
          font-size: 1.15rem;
        }
        .footer-bottom a {
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }
        .footer-bottom a:hover {
          text-decoration: underline;
        }
        .footer-bottom a span:last-child {
          margin-left: 1em;
        }
      `}</style>
    </>
  );
}
