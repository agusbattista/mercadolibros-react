import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function LoginForm() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de autenticación
    if (user === "admin" && password === "1234") {
      login(user);
      navigate("/administracion");
    } else {
      alert("Usuario y/o contraseña incorrectas");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      <Form.Group className="mb-3" controlId="formBasicUser">
        <Form.Label>Usuario</Form.Label>
        <Form.Control
          type="text"
          placeholder="admin"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="1234"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
export default LoginForm;
