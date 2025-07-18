import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { BookProvider } from "./context/BookContext";

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <BookProvider>{children}</BookProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default AppProviders;
