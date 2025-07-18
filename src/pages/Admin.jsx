import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { BookContext, useBookContext } from "../context/BookContext";
import BooksManager from "../components/BooksManager";
import Button from "react-bootstrap/Button";

function Admin() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const { resetBooks } = useBookContext();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <section className="container mt-2">
      <div className="d-flex justify-content-end mb-4 gap-3 border-bottom pb-4">
        <Button onClick={resetBooks} variant="warning">
          Resetear libros
        </Button>
        <Button variant="danger" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </div>
      <BooksManager />
    </section>
  );
}

export default Admin;
