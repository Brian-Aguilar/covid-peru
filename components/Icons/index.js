import Data from "./data";
import Menu from "./menu";
import Peru from "./peru";

export default function Icons(props) {
  switch (props.tipo) {
    case "menu":
      return <Menu {...props} />;
    case "peru":
      return <Peru {...props} />;
    case "data":
      return <Data {...props} />;
    default:
      return "hola";
  }
}
