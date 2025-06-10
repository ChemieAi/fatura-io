import { Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import CreateInvoice from "./pages/CreateInvoice";
import InvoiceHistory from "./pages/InvoiceHistory";
import Layout from "./components/Layout";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-invoice" element={<CreateInvoice />} />
        <Route path="/invoice-history" element={<InvoiceHistory />} />

      </Routes>
    </Layout>
  );
}

export default App;
