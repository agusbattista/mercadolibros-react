import Spinner from "react-bootstrap/Spinner";

function LoadingAnimation() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Cargando libros...</span>
    </Spinner>
  );
}

export default LoadingAnimation;
