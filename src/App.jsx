import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListPage from "./ListPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./global.css";
import AddItemPage from "./AddItemPage";

const queryClient = new QueryClient();

export default function App() {
  console.log(ListPage);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/additem" element={<AddItemPage />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

//
