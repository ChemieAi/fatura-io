import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function CreateInvoice() {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([{ name: "", quantity: 1, price: 0 }]);
  const [loading, setLoading] = useState(false);

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  };

  const updateItem = (index, key, value) => {
    const newItems = [...items];
    newItems[index][key] = value;
    setItems(newItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Kullanıcı oturumu yok.");
        setLoading(false);
        return;
      }

      const total = items.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      await addDoc(collection(db, "invoices"), {
        userId: user.uid,
        customerName,
        items,
        total,
        createdAt: serverTimestamp(),
      });

      alert("Fatura başarıyla kaydedildi.");
      navigate("/invoice-history");
    } catch (err) {
      console.error("Fatura kaydedilirken hata:", err);
      alert("Fatura kaydedilemedi.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow text-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Fatura Oluştur</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Müşteri Adı</label>
            <input
              type="text"
              className="w-full p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Ürünler</label>
            {items.map((item, index) => (
              <div key={index} className="flex gap-2 mb-3">
                <input
                  type="text"
                  placeholder="Ürün Adı"
                  className="w-1/2 p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  value={item.name}
                  onChange={(e) => updateItem(index, "name", e.target.value)}
                  required
                />
                <input
                  type="number"
                  min="1"
                  className="w-1/4 p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(index, "quantity", parseInt(e.target.value))
                  }
                  required
                />
                <input
                  type="number"
                  min="0"
                  className="w-1/4 p-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
                  value={item.price}
                  onChange={(e) =>
                    updateItem(index, "price", parseFloat(e.target.value))
                  }
                  required
                />
              </div>
            ))}
            <button
              type="button"
              className="text-blue-600 dark:text-blue-400 text-sm underline mb-4"
              onClick={addItem}
            >
              + Ürün Ekle
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`mt-4 py-2 px-4 rounded text-white w-full ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Kaydediliyor..." : "Faturayı Kaydet"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateInvoice;
