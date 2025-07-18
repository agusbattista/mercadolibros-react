import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import {
  Alert,
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";

function LoginForm() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de autenticación
    if (user === "admin" && password === "1234") {
      login(user);
      navigate("/administracion");
    } else {
      setAlertMessage("El nombre de usuario y/o contraseña es incorrecto.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8} lg={6} xl={5}>
          {" "}
          <Card className="shadow-lg p-5">
            {" "}
            <Card.Body>
              <h2 className="text-center mb-4">Iniciar sesión</h2>
              {alertMessage && (
                <Alert key="danger" variant="danger">
                  {alertMessage}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUser">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="admin"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="1234"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-2 fs-5"
                >
                  Iniciar sesión
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
