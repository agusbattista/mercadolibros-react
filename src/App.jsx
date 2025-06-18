import { useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Bestsellers from "./pages/Bestsellers";
import Offers from "./pages/Offers";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Details from "./pages/Details";

//My JSON Server - Fake Online REST Server (con 16 libros curados por mí)
const BASE_URL =
  "https://my-json-server.typicode.com/agusbattista/mercadolibros-data/books";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const notifyError = useCallback((error) => {
    setError("Error al cargar los libros. Inténtalo más tarde.");
    console.log("Error al cargar los libros.", error);
  }, []);

  const fetchBooks = useCallback(async () => {
    try {
      const response = await fetch(BASE_URL);
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
        setError(null);
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
  }, [notifyError]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <AuthProvider>
        <Router>
          <Header />
          <main className="flex-fill container my-4">
            <Routes>
              <Route
                path="/"
                element={<Home books={books} loading={loading} error={error} />}
              />
              <Route path="/detalles/:id" element={<Details />}></Route>
              <Route path="/contacto" element={<Contact />} />
              <Route path="/masvendidos" element={<Bestsellers />} />
              <Route
                path="/ofertas"
                element={
                  <Offers
                    books={books}
                    loading={loading}
                    error={error}
                    limit={8}
                  />
                }
              />
              <Route path="/carrito" element={<Cart />} />
              <Route
                path="/administracion"
                element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
