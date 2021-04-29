import Link from "next/link";
import { memo, useState } from "react";

import Icons from "../Icons";

function Navbar() {
  const [navbar, setNavbar] = useState(false);

  const navbarChange = () => {
    setNavbar(!navbar);
    if (navbar) {
      document.body.style.overflow = "visible";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <>
      <nav className="navbar shadow">
        <span role="button" onClick={navbarChange}>
          <Icons tipo="menu" width="1.75rem" height="1.75rem" />
        </span>
        <Link href="/">
          <a>Covid-19 Perú</a>
        </Link>
        <a
          href="https://www.datosabiertos.gob.pe/search/field_topic/covid-19-917?sort_by=changed"
          title="Datos abiertos perú"
          target="_blank"
        >
          <Icons
            tipo="data"
            width="1.75rem"
            height="1.75rem"
            fill="rgb(var(--negro))"
          />
        </a>
      </nav>

      <nav className={`navbar-mobile ${navbar && "active"}`}>
        <span className="cerrar-navbar" role="button" onClick={navbarChange}>
          <Icons tipo="cerrar" width="3em" height="3em" />
        </span>
        <ul className="navbar-menu">
          <li>
            <Link href="/">
              <a onClick={navbarChange}>Inicio</a>
            </Link>
          </li>
          <li>
            <Link href="/casos/positivos">
              <a onClick={navbarChange}>Casos Positivos</a>
            </Link>
          </li>
          <li>
            <Link href="/casos/fallecidos">
              <a onClick={navbarChange}>Casos Fallecidos</a>
            </Link>
          </li>
          <li>
            <Link href="/casos/vacunados">
              <a onClick={navbarChange}>Casos Vacunados</a>
            </Link>
          </li>
        </ul>
      </nav>

      <style jsx>{`
        .navbar {
          align-items: center;
          background: rgb(var(--blanco));
          display: flex;
          justify-content: space-between;
          padding: 1em;
          position: sticky;
          top: 0;
          width: 100%;
          z-index: 900;
        }

        .navbar > a {
          color: rgb(var(--rojo));
          font-size: 2rem;
          font-weight: bold;
        }
        a {
          text-decoration: none;
        }

        span {
          cursor: pointer;
        }

        .navbar-mobile {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 901;
          background-color: rgb(var(--blanco));
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }
        .navbar-mobile.active {
          transform: translateX(0%);
        }
        .navbar-menu {
          list-style: none;
          width: 100%;
          padding: 0;
        }
        .navbar-menu a {
          font-size: 2rem;
          width: 100%;
          display: block;
          text-align: center;
          padding: 1em 0;
          font-weight: bold;
        }
        .navbar-menu a:hover {
          background-color: rgb(var(--rojo));
          color: rgb(var(--blanco));
        }
        .cerrar-navbar {
          position: absolute;
          top: 1em;
          right: 1em;
        }
      `}</style>
    </>
  );
}

export default memo(Navbar);
