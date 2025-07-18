import { useState } from "react";
import { Button } from "react-bootstrap";
import { useBookContext } from "../context/BookContext";
import BooksTable from "./BooksTable";
import BookForm from "./BookForm";
import LoadingAnimation from "../components/LoadingAnimation";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { toast, Bounce } from "react-toastify";

function BooksManager() {
  const { books, loading, error, addBook, updateBook, deleteBook } =
    useBookContext();

  const [formError, setFormError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  const blankBook = {
    id: "",
    volumeInfo: {
      title: "",
      authors: [],
      imageLinks: {
        large: "",
      },
    },
    saleInfo: {
      listPrice: {
        amount: 0,
      },
    },
  };

  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(blankBook);

  const handleClose = () => {
    setShow(false);
    setForm(blankBook);
    setEditId(null);
    setFormError(null);
  };

  const handleShow = (book) => {
    setShow(true);
    if (book) {
      setForm(book);
      setEditId(book.id);
    } else {
      setForm(blankBook);
      setEditId(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    const bookData = {
      ...form,
      saleInfo: {
        ...form.saleInfo,
        listPrice: {
          ...form.saleInfo.listPrice,
          amount: Number(form.saleInfo.listPrice.amount),
        },
      },
    };

    try {
      if (editId) {
        await updateBook(editId, bookData);
      } else {
        if (!form.id || form.id.trim() === "") {
          setFormError("Debes proporcionar un ID para el libro");
          return;
        }
        await addBook({
          ...bookData,
          id: form.id.trim(),
        });
      }
      handleClose();
    } catch (error) {
      console.error("Error al agregar/editar el libro:", error);
      setFormError(
        `Error al ${editId ? "editar" : "agregar"} el libro: ${error.message}`
      );
    }
  };

  const handleDelete = (id) => {
    setBookToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async (id) => {
    try {
      await deleteBook(id);
      toast.success("Libro eliminado correctamente", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Error al eliminar libro:", error);
      toast.error("Error al eliminar el libro", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setShowDeleteModal(false);
      setBookToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setBookToDelete(null);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Libros</h2>
        <Button variant="primary" onClick={() => handleShow()}>
          Agregar libro
        </Button>
      </div>

      {loading && <LoadingAnimation />}
      {error && !loading && <p>{error}</p>}

      <BooksTable
        books={books}
        handleShow={handleShow}
        handleDelete={handleDelete}
      />

      <BookForm
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        form={form}
        setForm={setForm}
        show={show}
        editId={editId}
        formError={formError}
      />

      <DeleteConfirmModal
        show={showDeleteModal}
        onHide={cancelDelete}
        id={bookToDelete}
        confirmDelete={confirmDelete}
      />
    </>
  );
}

export default BooksManager;
