import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import RenderCartCard from "../components/RenderCartCard";
import Button from "react-bootstrap/Button";

function Cart() {
  const { cart, cleanCart, totalPrice, totalItems } = useContext(CartContext);

  return (
    <section className="container mt-4">
      {cart.length > 0 ? (
        <>
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {cart.map((book) => (
              <div className="col d-flex align-items-stretch" key={book.id}>
                <RenderCartCard book={book} />
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <p>Cantidad total de libros: {totalItems}</p>
            <p>Precio total: uS${Number(totalPrice.toFixed(2))}</p>
            <Button variant="danger" onClick={cleanCart}>
              Vaciar Carrito
            </Button>
          </div>
        </>
      ) : (
        <p className="text-center">El carrito está vacío.</p>
      )}
    </section>
  );
}

export default Cart;
