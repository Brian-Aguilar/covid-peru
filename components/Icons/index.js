import { memo } from "react";
import Cerrar from "./cerrar";
import Data from "./data";
import { FDown, FRight, FUp } from "./flechas";
import Github from "./github";
import Menu from "./menu";
import Peru from "./peru";

function Icons(props) {
  switch (props.tipo) {
    case "menu":
      return <Menu {...props} />;
    case "peru":
      return <Peru {...props} />;
    case "data":
      return <Data {...props} />;
    case "flecha-arriba":
      return <FUp {...props} />;
    case "flecha-abajo":
      return <FDown {...props} />;
    case "flecha-derecha":
      return <FRight {...props} />;
    case "github":
      return <Github {...props} />;
    case "cerrar":
      return <Cerrar {...props} />;
    default:
      return "hola";
  }
}

export default memo(Icons);
