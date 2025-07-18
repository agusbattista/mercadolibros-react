import { useState } from "react";
import { Button } from "react-bootstrap";
import { useBookContext } from "../context/BookContext";
import BooksTable from "./BooksTable";
import BookForm from "./BookForm";
import LoadingAnimation from "../components/LoadingAnimation";

function BooksManager() {
  const { books, loading, error, addBook, updateBook, deleteBook } =
    useBookContext();

  const [formError, setFormError] = useState(null);

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

  //Convetir a un modal
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro que deseas eliminar este libro?")) {
      try {
        await deleteBook(id);
      } catch (error) {
        console.error("Error al eliminar libro:", error);
      }
    }
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
    </>
  );
}

export default BooksManager;
