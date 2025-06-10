import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Giriş başarısız: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-80 text-gray-900 dark:text-white"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Giriş Yap</h2>

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
          Giriş Yap
        </button>

        <p className="mt-4 text-sm text-center">
          Hesabın yok mu?{" "}
          <a href="/register" className="text-blue-400 hover:text-blue-300 underline">
            Kayıt Ol
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
