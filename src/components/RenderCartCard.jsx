import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function RenderCartCard({ book }) {
  const { removeFromCart } = useContext(CartContext);
  const handleRemoveFromCart = () => {
    removeFromCart(book);
  };
  // Función auxiliar para asegurar HTTPS
  const ensureHttps = (url) => {
    if (!url) return "";
    return url.replace(/^http:/, "https:");
  };
  return (
    <Card style={{ width: "18rem" }} className="d-flex flex-column mx-auto">
      <Link to={`/detalles/${book.id}`} style={{ cursor: "pointer" }}>
        <Card.Img
          variant="top"
          src={ensureHttps(book.volumeInfo.imageLinks?.large)}
          alt={"Imagen de " + book.volumeInfo.title}
          loading="lazy"
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{book.volumeInfo.title}</Card.Title>
        <Card.Text>
          {book.volumeInfo.authors?.join(", ") || "Autor desconocido"}
        </Card.Text>
        <Card.Text>US${book.saleInfo?.listPrice?.amount ?? 0}</Card.Text>
        <Card.Text>Cantidad: {book.quantity}</Card.Text>
        <Button
          variant="warning"
          className="mt-auto"
          onClick={handleRemoveFromCart}
        >
          Eliminar del carrito
        </Button>
      </Card.Body>
    </Card>
  );
}
export default RenderCartCard;
