import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}

export default AppProviders;
