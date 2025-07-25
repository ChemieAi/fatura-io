import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <form
        onSubmit={handleRegister}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-80 text-gray-900 dark:text-white"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Kayıt Ol</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Şifre"
          className="w-full p-2 mb-3 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Kayıt Ol
        </button>

        <p className="mt-4 text-sm text-center">
          Zaten hesabın var mı?{" "}
          <a href="/" className="text-blue-400 hover:text-blue-300 underline">
            Giriş Yap
          </a>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
