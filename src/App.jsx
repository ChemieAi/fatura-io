import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      {/* Diğer sayfalar daha sonra buraya eklenecek */}
    </Routes>
  );
}

export default App;
