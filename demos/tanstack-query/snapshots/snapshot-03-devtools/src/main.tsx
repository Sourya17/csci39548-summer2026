import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // How long fetched data is considered "fresh". While fresh, TanStack
      // serves it from cache and does NOT refetch. After this, it's "stale".
      staleTime: 5_000, // 5 seconds (default is 0 — instantly stale)

      // When the browser tab regains focus, refetch any STALE queries.
      // (This is on by default; we set it explicitly to talk about it.)
      refetchOnWindowFocus: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {/* The floating panel. Click the logo (bottom corner) to open it. */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
