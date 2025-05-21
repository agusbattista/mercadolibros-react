import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Bestsellers from "./pages/Bestsellers";
import Offers from "./pages/Offers";

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
      <Router>
        <div>
          <Header />
          {loading && <p>Cargando productos...</p>}
          {!loading && !error && <p>Productos cargados</p>}
          {error && !loading && <p>{error}</p>}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/masvendidos" element={<Bestsellers />} />
            <Route path="/ofertas" element={<Offers />} />
          </Routes>
        </div>
      </Router>
    </main>
  );
}

export default App;
