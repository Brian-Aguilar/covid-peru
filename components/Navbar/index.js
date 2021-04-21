import Link from "next/link";
import Icons from "../Icons";

export default function Navbar() {
  return (
    <>
      <nav className="shadow">
        <span>
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

      <style jsx>{`
        nav {
          align-items: center;
          background: rgb(var(--blanco));
          display: flex;
          justify-content: space-between;
          padding: 1em;
          position: sticky;
          top: 0;
          width: 100%;
        }

        nav > a {
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
      `}</style>
    </>
  );
}
