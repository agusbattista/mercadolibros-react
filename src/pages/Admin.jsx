import Button from "react-bootstrap/Button";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Admin() {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/login");
  };

  return (
    <section>
      <p>Soy la página de administración</p>
      <Button variant="danger" onClick={handleClick}>
        Cerrar sesión
      </Button>
    </section>
  );
}

export default Admin;
