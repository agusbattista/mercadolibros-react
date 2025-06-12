import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function RenderDetails({ book }) {
  const { addToCart } = useContext(CartContext);
  const handleAddToCart = () => {
    addToCart(book);
  };
  const navigate = useNavigate();

  // Función auxiliar para asegurar HTTPS
  const ensureHttps = (url) => {
    if (!url) return "";
    return url.replace(/^http:/, "https:");
  };

  return (
    <Card style={{ width: "80%" }} className="d-flex flex-column mx-auto">
      <Card.Img
        variant="top"
        src={ensureHttps(book.volumeInfo.imageLinks?.large)}
        alt={"Imagen de " + book.volumeInfo.title}
        loading="lazy"
        style={{ height: "70vh", width: "100%", objectFit: "contain" }}
        className="mt-4"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{book.volumeInfo.title}</Card.Title>
        <Card.Text>
          {book.volumeInfo.authors?.join(", ") || "Autor desconocido"}
        </Card.Text>
        <Card.Text>
          ISBN: {book.volumeInfo.industryIdentifiers?.[0]?.identifier || "N/A"}
        </Card.Text>
        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html:
              book.volumeInfo?.description || "Sin descripción disponible",
          }}
        />
        <Card.Text>US${book.saleInfo?.listPrice?.amount ?? 0}</Card.Text>
        <Button variant="primary" className="mt-auto" onClick={handleAddToCart}>
          Agregar al carrito
        </Button>
        <Button
          variant="secondary"
          className="mt-2"
          onClick={() => navigate(-1)}
        >
          Volver{" "}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default RenderDetails;
