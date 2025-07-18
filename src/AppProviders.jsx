import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { BookProvider } from "./context/BookContext";

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <BookProvider>
        <CartProvider>{children}</CartProvider>
      </BookProvider>
    </AuthProvider>
  );
}

export default AppProviders;
