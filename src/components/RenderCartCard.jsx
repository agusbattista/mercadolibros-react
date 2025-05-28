import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function RenderCartCard({ book }) {
  const { removeFromCart } = useContext(CartContext);
  const handleRemoveFromCart = () => {
    removeFromCart(book);
  };
  return (
    <Card style={{ width: "18rem" }} className="d-flex flex-column mx-auto">
      <Card.Img
        variant="top"
        src={book.volumeInfo.imageLinks?.large}
        alt={"Imagen de " + book.volumeInfo.title}
        loading="lazy"
      />
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
