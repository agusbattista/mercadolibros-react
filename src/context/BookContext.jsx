import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";

//My JSON Server - Fake Online REST Server (con 16 libros curados por mí)
const BASE_URL =
  "https://my-json-server.typicode.com/agusbattista/mercadolibros-data/books";
/*
  La API My JSON Server es una herramienta que permite crear un servidor RESTful falso para pruebas y desarrollo.
  En este caso, se utiliza para simular una API de libros con un conjunto de datos predefinidos.
  Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sin necesidad de un backend real; con la salvedad de que los datos no son persistentes.
  Por lo tanto, se combina con un estado local en React para manejar los libros en la aplicación.
  */

export const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const notifyError = useCallback((error) => {
    setError("Error al cargar los libros. Inténtalo más tarde.");
    console.log("Error al cargar los libros.", error);
  }, []);

  const fetchBooks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(BASE_URL);
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
        setError(null);
        localStorage.setItem("localBooks", JSON.stringify(data));
      } else {
        setBooks([]);
        notifyError(response.status);
      }
    } catch (error) {
      setBooks([]);
      notifyError(error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setBooks, setError, notifyError]);

  useEffect(() => {
    const savedBooks = localStorage.getItem("localBooks");
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
      setLoading(false);
    } else {
      fetchBooks();
    }
  }, [fetchBooks]);

  useEffect(() => {
    if (books.length > 0 && !loading) {
      localStorage.setItem("localBooks", JSON.stringify(books));
    }
  }, [books, loading]);

  const getBook = useCallback(
    (id) => {
      const book = books.find((book) => book.id === id);
      if (!book) {
        throw new Error(`Libro con ID ${id} no encontrado.`);
      }
      return Promise.resolve(book);
    },
    [books]
  );

  const addBook = useCallback(
    async (book) => {
      try {
        setLoading(true);
        await fetch(BASE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(book),
        });
        setBooks((prevBooks) => [...prevBooks, book]);
        return book;
      } catch (error) {
        console.error("Error al agregar el libro:", error);
        setError("Error al agregar el libro");
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setBooks, setError]
  );

  const updateBook = useCallback(
    async (id, bookData) => {
      try {
        setLoading(true);
        await fetch(`${BASE_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookData),
        });
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book.id === id ? { ...bookData, id } : book))
        );
        return { ...bookData, id };
      } catch (error) {
        console.error(`Error al actualizar el libro con ID ${id}:`, error);
        setError(`Error al actualizar el libro con ID ${id}`);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setBooks, setError]
  );

  const deleteBook = useCallback(
    async (id) => {
      try {
        setLoading(true);
        await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        return true;
      } catch (error) {
        console.error(`Error al eliminar el libro con ID ${id}:`, error);
        setError(`Error al eliminar el libro con ID ${id}`);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setBooks, setError]
  );

  const resetBooks = useCallback(async () => {
    await fetchBooks();
  }, [fetchBooks]);

  return (
    <BookContext.Provider
      value={{
        books,
        loading,
        error,
        fetchBooks,
        getBook,
        addBook,
        updateBook,
        deleteBook,
        resetBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export const useBookContext = () => useContext(BookContext);
