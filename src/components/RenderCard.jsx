import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function RenderCard({ book }) {
  const { addToCart } = useContext(CartContext);
  const handleAddToCart = () => {
    addToCart(book);
  };
  return (
    <Card style={{ width: "18rem" }} className="d-flex flex-column mx-auto">
      <Link to={`/detalles/${book.id}`} style={{ cursor: "pointer" }}>
        <Card.Img
          variant="top"
          src={book.volumeInfo.imageLinks?.large}
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
        <Button variant="primary" className="mt-auto" onClick={handleAddToCart}>
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default RenderCard;
