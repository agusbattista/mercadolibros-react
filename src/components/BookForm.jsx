import { Alert, Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

function BookForm({
  handleClose,
  handleSubmit,
  form,
  setForm,
  show,
  editId,
  formError,
}) {
  const ensureHttps = (url) => {
    if (!url) return "";
    return url.replace(/^http:/, "https:");
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" className="mt-5">
      <Modal.Header closeButton>
        <Modal.Title>{editId ? "Editar" : "Agregar"} libro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {formError && <Alert variant="danger">{formError}</Alert>}
        {!editId && (
          <Alert variant="warning">
            Se recomienda utilizar un libro de la API de Google para poder
            recuperar todos los detalles del mismo. Te invito a completarlo con
            los siguientes datos:
            <span className="ms-1">
              <Link
                to="https://www.googleapis.com/books/v1/volumes/NDxlDwAAQBAJ"
                target="_blank"
                rel="noopener noreferrer"
              >
                JSON de ejemplo
              </Link>
            </span>
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="text"
              value={editId || form.id}
              placeholder="NDxlDwAAQBAJ"
              onChange={(e) =>
                setForm({
                  ...form,
                  id: e.target.value,
                })
              }
              required
              disabled={!!editId}
            />
            <Form.Text className="text-muted">
              Proporciona un ID que exista en la API de Google Books
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              value={form.volumeInfo.title}
              placeholder={"Fuego y Sangre (Canción de Hielo y Fuego 0)"}
              onChange={(e) =>
                setForm({
                  ...form,
                  volumeInfo: { ...form.volumeInfo, title: e.target.value },
                })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Autores</Form.Label>
            <Form.Control
              value={form.volumeInfo.authors?.join(", ")}
              placeholder="George R. R. Martin"
              onChange={(e) =>
                setForm({
                  ...form,
                  volumeInfo: {
                    ...form.volumeInfo,
                    authors: e.target.value
                      .split(",")
                      .map((author) => author.trim()),
                  },
                })
              }
              required
            />
            <Form.Text className="text-muted">
              Si son varios autores, separalos por coma
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL de la imagen</Form.Label>
            <Form.Control
              value={form.volumeInfo.imageLinks?.large}
              placeholder="https://example.com/image.jpg"
              onChange={(e) =>
                setForm({
                  ...form,
                  volumeInfo: {
                    ...form.volumeInfo,
                    imageLinks: {
                      ...form.volumeInfo.imageLinks,
                      large: e.target.value,
                    },
                  },
                })
              }
              required
            />
            <Form.Text className="text-muted">
              Elegí la opción large de Google Books para una mejor calidad
            </Form.Text>
            {form.volumeInfo.imageLinks?.large &&
              form.volumeInfo.imageLinks.large.trim() !== "" && (
                <div className="mt-2 text-center">
                  <img
                    src={ensureHttps(form.volumeInfo.imageLinks?.large)}
                    alt="Vista previa de la imagen"
                    style={{ maxHeight: "150px" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "";
                    }}
                  />
                </div>
              )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              min="1"
              value={form.saleInfo.listPrice.amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  saleInfo: {
                    ...form.saleInfo,
                    listPrice: {
                      ...form.saleInfo.listPrice,
                      amount: e.target.value,
                    },
                  },
                })
              }
              required
            />
            <Form.Text className="text-muted">
              Se permiten dos decimales después del punto
            </Form.Text>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default BookForm;
