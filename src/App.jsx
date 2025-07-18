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
import ProtectedRoute from "./components/ProtectedRoute";
import Details from "./pages/Details";

const bestSellersLimit = 8;
const offersLimit = 8;

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Header />
        <main className="flex-fill container my-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detalles/:id" element={<Details />}></Route>
            <Route path="/contacto" element={<Contact />} />
            <Route
              path="/masvendidos"
              element={<Bestsellers limit={bestSellersLimit} />}
            />
            <Route path="/ofertas" element={<Offers limit={offersLimit} />} />
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
    </div>
  );
}

export default App;
