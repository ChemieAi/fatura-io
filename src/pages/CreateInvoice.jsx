import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function CreateInvoice() {
    const navigate = useNavigate();

    const [customerName, setCustomerName] = useState("");
    const [items, setItems] = useState([
        { name: "", quantity: 1, price: 0 },
    ]);

    const addItem = () => {
        setItems([...items, { name: "", quantity: 1, price: 0 }]);
    };

    const updateItem = (index, key, value) => {
        const newItems = [...items];
        newItems[index][key] = value;
        setItems(newItems);
    };

    // handleSubmit fonksiyonu içinde:
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = auth.currentUser;

            if (!user) {
                alert("Kullanıcı oturumu yok.");
                return;
            }

            const total = items.reduce((sum, item) => {
                return sum + item.quantity * item.price;
            }, 0);

            await addDoc(collection(db, "invoices"), {
                userId: user.uid,
                customerName,
                items,
                total,
                createdAt: serverTimestamp(),
            });

            alert("Fatura başarıyla kaydedildi.");
            navigate("/dashboard");
        } catch (err) {
            console.error("Fatura kaydedilirken hata:", err);
            alert("Fatura kaydedilemedi.");
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Fatura Oluştur</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-1">Müşteri Adı</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
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
                                    className="w-1/2 p-2 border rounded"
                                    value={item.name}
                                    onChange={(e) => updateItem(index, "name", e.target.value)}
                                    required
                                />
                                <input
                                    type="number"
                                    min="1"
                                    className="w-1/4 p-2 border rounded"
                                    value={item.quantity}
                                    onChange={(e) => updateItem(index, "quantity", e.target.value)}
                                    required
                                />
                                <input
                                    type="number"
                                    min="0"
                                    className="w-1/4 p-2 border rounded"
                                    value={item.price}
                                    onChange={(e) => updateItem(index, "price", e.target.value)}
                                    required
                                />
                            </div>
                        ))}

                        <button
                            type="button"
                            className="text-blue-600 text-sm underline mb-4"
                            onClick={addItem}
                        >
                            + Ürün Ekle
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        PDF Oluştur (yakında)
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateInvoice;
