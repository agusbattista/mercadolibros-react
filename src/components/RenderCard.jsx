import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import BaseBookCard from "./BaseBookCard";

function RenderCard({ book }) {
  const { addToCart } = useContext(CartContext);
  const handleAddToCart = () => {
    addToCart(book);
  };

  return (
    <BaseBookCard
      book={book}
      buttonText="Agregar al carrito"
      buttonVariant="primary"
      onButtonClick={handleAddToCart}
      showQuantity={false}
    />
  );
}

export default RenderCard;
