import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TodosPage from "./pages/TodosPage";
import TodoDetailPage from "./pages/TodoDetailPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="todos" element={<TodosPage />} />
        {/* :id is a dynamic segment — matches /todos/1, /todos/2, … */}
        <Route path="todos/:id" element={<TodoDetailPage />} />
        <Route path="about" element={<AboutPage />} />
        {/* "*" catches anything no other route matched → 404. Keep it last. */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
