import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TodosPage from "./pages/TodosPage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  return (
    <Routes>
      {/* A "layout route" — no path of its own. It renders <Layout>, and the
          matching child renders inside Layout's <Outlet>. */}
      <Route element={<Layout />}>
        {/* `index` = the default child for the parent's path ("/"). */}
        <Route index element={<HomePage />} />
        <Route path="todos" element={<TodosPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}
