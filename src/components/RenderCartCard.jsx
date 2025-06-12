import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import BaseBookCard from "./BaseBookCard";

function RenderCartCard({ book }) {
  const { removeFromCart } = useContext(CartContext);
  const handleRemoveFromCart = () => {
    removeFromCart(book);
  };

  return (
    <BaseBookCard
      book={book}
      buttonText="Eliminar del carrito"
      buttonVariant="warning"
      onButtonClick={handleRemoveFromCart}
      showQuantity={true}
    />
  );
}

export default RenderCartCard;
