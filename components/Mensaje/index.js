import { useCallback, useRef } from "react";
import Icons from "../Icons";

function Mensaje({ texto, color = "gris" }) {
  const mensajeContenido = useRef();

  const handleCerrar = useCallback(() => {
    mensajeContenido.current.classList.toggle("close");
  }, [mensajeContenido]);

  return (
    <>
      <div className="mensaje" ref={mensajeContenido}>
        <span role="button" onClick={handleCerrar}>
          <Icons tipo="cerrar" width="2.25em" height="2.25em" />
        </span>
        <p>{texto}</p>
      </div>
      <style jsx>{`
        .mensaje {
          width: 80vw;
          background: rgba(var(--${color}), 0.5);
          color: rgb(var(--blanco));
          margin: 1em auto;
          padding: 1.25em;
          border-radius: 1.25em;
          position: relative;
        }
        .mensaje.close {
          animation: animationM 0.3s forwards ease-out;
        }
        .mensaje p {
          text-align: center;
        }

        .mensaje span {
          position: absolute;
          top: 1.25em;
          right: 1.25em;
          cursor: pointer;
        }

        @keyframes animationM {
          from {
            visibility: visible;
            opacity: 1;
          }

          to {
            visibility: hidden;
            opacity: 0;
            height: 0px;
            overflow: hidden;
            padding: 0;
            margin: 0;
          }
        }
      `}</style>
    </>
  );
}

export default Mensaje;
