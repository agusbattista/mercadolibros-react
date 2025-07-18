import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useBookContext } from "../context/BookContext";

function DeleteConfirmModal({ show, onHide, id, confirmDelete }) {
  const { getBook } = useBookContext();
  const book = id ? getBook(id) : null;
  const title = book?.volumeInfo?.title || "Libro no encontrado";

  const handleConfirm = () => {
    if (id) {
      confirmDelete(id);
    } else {
      console.error("Error: Se intentó eliminar un libro sin ID");
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Eliminar libro</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>¿Está seguro de que desea eliminar el libro seleccionado?</p>
        {id && <p className="fst-italic">"{title}"</p>}
        {!id && (
          <p className="text-danger">
            Advertencia: No se ha seleccionado un libro válido.
          </p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleConfirm} disabled={!id}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteConfirmModal;
