import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializePerformanceOptimizations } from './utils/enhancePerformance'

// Create root and render app
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Initialize performance optimizations after initial render
initializePerformanceOptimizations();
