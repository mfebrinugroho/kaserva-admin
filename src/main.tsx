import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter as Router } from "react-router";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // gagal sekali baru berhenti
      staleTime: 1000 * 60 * 5, // data dianggap fresh selama 5 menit
      refetchOnWindowFocus: false, // tidak melakukan refetch saat window difokuskan
      // refetchOnReconnect: true, // melakukan refetch saat koneksi internet kembali
      // gcTime: 1000 * 60 * 10, // cache dihapus setelah 10 menit
    },
    mutations: {
      retry: false, // tidak melakukan retry pada mutation
    },
  },
});

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <ThemeProvider>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </ThemeProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  </StrictMode>,
);
