import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=react&maxResults=30")
      .then((response) => response.json())
      .then((data) => setBooks(data.items))
      .catch((error) => {
        setError("Error al cargar los libros. Inténtalo más tarde.");
        console.log("Error al cargar los libros", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <h1>Inicio</h1>
      {loading && <p>Cargando productos...</p>}
      {error && !loading && <p>{error}</p>}
      {!loading && !error && <p>Productos cargados</p>}
    </main>
  );
}

export default App;
