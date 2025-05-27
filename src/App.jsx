import { useEffect, useState } from "react";
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

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=fiction&maxResults=28")
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
              <Route path="/contacto" element={<Contact />} />
              <Route path="/masvendidos" element={<Bestsellers />} />
              <Route path="/ofertas" element={<Offers />} />
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
