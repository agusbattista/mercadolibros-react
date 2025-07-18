import { Table, Button } from "react-bootstrap";

function BooksTable({ books, handleShow, handleDelete }) {
  const ensureHttps = (url) => {
    if (!url) return "";
    return url.replace(/^http:/, "https:");
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Título</th>
          <th>Autor</th>
          <th>Precio</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.volumeInfo.title}</td>
            <td>
              {book.volumeInfo.authors?.join(", ") || "Autor desconocido"}
            </td>
            <td>${Number(book.saleInfo?.listPrice?.amount ?? 0).toFixed(2)}</td>
            <td className="align-middle" style={{ width: "100px" }}>
              <div className="d-flex flex-column gap-3 align-items-center justify-content-center">
                {book.volumeInfo.imageLinks?.large ? (
                  <img
                    src={ensureHttps(book.volumeInfo.imageLinks.large)}
                    alt={`Imagen de ${book.volumeInfo.title}`}
                    style={{ maxWidth: "80px", maxHeight: "100px" }}
                  />
                ) : (
                  <span>Sin imagen</span>
                )}
              </div>
            </td>
            <td className="align-middle">
              <div className="d-flex flex-column gap-3 align-items-center justify-content-center">
                <Button
                  variant="warning"
                  size="sm"
                  className="w-100"
                  onClick={() => handleShow(book)}
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  className="w-100"
                  onClick={() => handleDelete(book.id)}
                >
                  Eliminar
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default BooksTable;
