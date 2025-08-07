import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "./contexts/AuthContext"
import { CartProvider } from "./contexts/CartContext"
import { DynamicThemeProvider } from "./contexts/ThemeContext"
import { Toaster } from "@/components/ui/toaster"
import { Routes } from "./routes"
import { MetaPixel } from "./components/MetaPixel"
import { MicrosoftClarity } from "./components/MicrosoftClarity"

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <DynamicThemeProvider>
        <AuthProvider>
          <CartProvider>
            <MetaPixel />
            <MicrosoftClarity />
            <Routes />
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </DynamicThemeProvider>
    </ThemeProvider>
  )
}

export default App
