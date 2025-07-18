import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { Badge, Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function NavigationBar() {
  const { getCartTotal } = useContext(CartContext);
  const totalItems = getCartTotal();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MercadoLibros
        </Navbar.Brand>
        {/* Ícono del carrito para pantallas pequeñas */}
        <div className="ms-auto me-4 d-lg-none">
          <Link to="/carrito" className="text-white position-relative">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            {totalItems > 0 && (
              <Badge
                pill
                bg="danger"
                className="position-absolute top-0 start-100 translate-middle"
              >
                {totalItems}
              </Badge>
            )}
          </Link>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/masvendidos">
              Más vendidos
            </Nav.Link>
            <Nav.Link as={Link} to="/ofertas">
              Ofertas
            </Nav.Link>
            <Nav.Link as={Link} to="/contacto">
              Contacto
            </Nav.Link>
            <Nav.Link as={Link} to="/administracion">
              Administración
            </Nav.Link>
          </Nav>
          {/* Ícono del carrito para pantallas grandes */}
          <Nav className="ms-auto d-none d-lg-flex">
            <Link to="/carrito" className="text-white position-relative">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
              {totalItems > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {totalItems}
                </Badge>
              )}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
