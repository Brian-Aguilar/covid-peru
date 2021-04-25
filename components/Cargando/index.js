import { useEffect } from "react";

export default function Cargando({ isActive }) {
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isActive]);
  return (
    <>
      <div className={`cargando ${isActive ? "open" : "close"}`}>
        <img src="/logo.png" alt="Logo" />
        <h1>Cargando datos ...</h1>
      </div>
      <style jsx>{`
        .cargando {
          width: 100vw;
          height: 100vh;
          background: rgb(var(--blanco));
          position: fixed;
          top: 0;
          left: 0;
          z-index: 903;
          transform: translateY(0%);
          transition: all 0.3s ease-in;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .cargando.close {
          transform: translateY(-100%);
        }

        .cargando img {
          max-width: 200px;
          animation: animation_image 1.5s infinite ease-in;
        }
        .cargando h1 {
          margin-top: 2em;
        }

        @keyframes animation_image {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.5);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}
