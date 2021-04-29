import { memo } from "react";

function Card({ children }) {
  return (
    <>
      <div className="card shadow shadow-hover">
        <img src="/fondo_covid.png" />
        <div className="card-content">{children}</div>
      </div>
      <style jsx>{`
        .card {
          border-radius: 0.75em;
          max-width: 350px;
          padding: 0.5em;
          position: relative;
          width: 100%;
          z-index: inherit;
          overflow: hidden;
        }
        .card img {
          position: absolute;
          z-index: -1;
          width: 200px;
          height: 200px;
          bottom: 0;
          right: 0;
          transform: translateY(50%) translateX(50%);
          opacity: 0.3;
          transition: all 0.3s ease-in;
        }
        .card:hover img {
          transform: translateY(50%) translateX(50%) scale(1.5);
        }
        .card-content {
          align-items: center;
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
        }

        :global(.card-content .titulo) {
          font-size: 1.75rem;
          margin-bottom: 0;
          font-weight: 400;
          text-transform: uppercase;
          text-align: center;
        }
        :global(.card-content .sub-titulo) {
          font-size: 2rem;
          font-weight: 600;
        }
        :global(.card-content .porcentaje) {
          font-size: 1.75rem;
          font-weight: 600;
          position: absolute;
          z-index: -1;
          bottom: 0;
          right: 0;
          transform: translateY(100%) translateX(100%);
          color: rgb(var(--blanco));
          transition: all 0.3s ease-in;
        }
        :global(.card:hover .porcentaje) {
          transform: translateY(-10%) translateX(-5%) scale(1);
        }
      `}</style>
    </>
  );
}

export default memo(Card);
