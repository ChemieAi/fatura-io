import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { InvoicePDF } from "../components/InvoicePDF";

function InvoiceHistory() {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "invoices"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setInvoices(data);
    };

    fetchInvoices();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "-";
    const date = timestamp.toDate();
    return date.toLocaleDateString("tr-TR");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6 transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Fatura Geçmişi</h2>

        {invoices.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">Henüz hiç fatura oluşturulmamış.</p>
        ) : (
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-left">
                <th className="p-3 border">Fatura No</th>
                <th className="p-3 border">Müşteri</th>
                <th className="p-3 border">Tarih</th>
                <th className="p-3 border">Toplam Tutar</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv, index) => (
                <tr
                  key={inv.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                  onClick={() => setSelectedInvoice(inv)}
                >
                  <td className="p-3 border">#{index + 1}</td>
                  <td className="p-3 border">{inv.customerName}</td>
                  <td className="p-3 border">{formatDate(inv.createdAt)}</td>
                  <td className="p-3 border">{inv.total.toFixed(2)} ₺</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {selectedInvoice && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-full max-w-md relative text-gray-900 dark:text-white">
              <h2 className="text-xl font-bold mb-2">Fatura Detayı</h2>
              <p className="mb-1">
                <strong>Müşteri:</strong> {selectedInvoice.customerName}
              </p>
              <p className="mb-3">
                <strong>Tarih:</strong>{" "}
                {selectedInvoice.createdAt?.toDate().toLocaleDateString("tr-TR")}
              </p>

              <div className="mb-3">
                <strong>Ürünler:</strong>
                <ul className="list-disc ml-5 mt-1 text-sm">
                  {selectedInvoice.items.map((item, idx) => (
                    <li key={idx}>
                      {item.name} — {item.quantity} x {item.price} ₺
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mb-4">
                <strong>Toplam:</strong> {selectedInvoice.total.toFixed(2)} ₺
              </p>

              <div className="mt-3">
                <PDFDownloadLink
                  document={<InvoicePDF invoice={selectedInvoice} />}
                  fileName={`fatura_${selectedInvoice.customerName}.pdf`}
                  className="text-blue-600 dark:text-blue-400 text-sm underline"
                >
                  {({ loading }) => (loading ? "PDF hazırlanıyor..." : "PDF İndir")}
                </PDFDownloadLink>
              </div>

              <div className="text-right mt-4">
                <button
                  className="text-sm text-blue-600 dark:text-blue-400 underline"
                  onClick={() => setSelectedInvoice(null)}
                >
                  Kapat
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-500 dark:text-blue-300 underline"
          >
            ⬅️ Panele Dön
          </button>
        </div>
      </div>
    </div>
  );
}

export default InvoiceHistory;
