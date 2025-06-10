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

        return () => unsubscribe(); // Temizlik
    }, [navigate]);

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-4">Hoş geldin</h2>
                <p className="mb-4 text-gray-700">{userEmail}</p>

                <div className="flex flex-col gap-3">
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        onClick={() => navigate("/create-invoice")}
                    >
                        Fatura Oluştur
                    </button>
                    <button
                        className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                        onClick={() => navigate("/invoice-history")}
                    >
                        Fatura Geçmişi
                    </button>

                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
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
