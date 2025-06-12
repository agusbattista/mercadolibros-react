import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function BaseBookCard({
  book,
  buttonText,
  buttonVariant,
  onButtonClick,
  showQuantity,
}) {
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
        {showQuantity && <Card.Text>Cantidad: {book.quantity}</Card.Text>}
        <Button
          variant={buttonVariant}
          className="mt-auto"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BaseBookCard;
