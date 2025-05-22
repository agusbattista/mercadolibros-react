import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function RenderCard({ book }) {
  function showCartAddedAlert() {
    return alert(`Libro ${book.volumeInfo.title} agregado al carrito`);
  }
  return (
    <Card
      key={book.id}
      style={{ width: "18rem" }}
      className="d-flex flex-column mx-auto"
    >
      <Card.Img
        variant="top"
        src={book.volumeInfo.imageLinks?.thumbnail}
        alt={"Imagen de " + book.volumeInfo.title}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{book.volumeInfo.title}</Card.Title>
        <Card.Text>
          {book.volumeInfo.authors?.join(", ") || "Autor desconocido"}
        </Card.Text>
        <Button
          variant="primary"
          className="mt-auto"
          onClick={showCartAddedAlert}
        >
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
}
export default RenderCard;
