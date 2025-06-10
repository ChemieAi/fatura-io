import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

function LoginForm({ onFlip }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Giriş başarısız: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full h-full flex flex-col justify-center"
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
      <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Giriş Yap
      </button>
      <p className="mt-4 text-sm text-center">
        Hesabın yok mu?{" "}
        <span
          className="text-blue-600 underline cursor-pointer"
          onClick={onFlip}
        >
          Kayıt Ol
        </span>
      </p>
    </form>
  );
}

export default LoginForm;
