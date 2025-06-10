import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

function Dashboard() {
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Hoş geldin</h2>
        <p className="mb-6">{userEmail}</p>

        <div className="flex flex-col gap-3">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition"
            onClick={() => navigate("/create-invoice")}
          >
            Fatura Oluştur
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded transition"
            onClick={() => navigate("/invoice-history")}
          >
            Fatura Geçmişi
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
            onClick={handleLogout}
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
