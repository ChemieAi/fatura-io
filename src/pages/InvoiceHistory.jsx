import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function InvoiceHistory() {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  // Şimdilik sahte veriler
  useEffect(() => {
    const mockData = [
      {
        id: "1",
        customerName: "Ahmet Yılmaz",
        date: "2025-06-10",
        total: 450,
      },
      {
        id: "2",
        customerName: "Ayşe Demir",
        date: "2025-06-08",
        total: 1200,
      },
    ];

    setInvoices(mockData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Fatura Geçmişi</h2>

        {invoices.length === 0 ? (
          <p>Henüz fatura oluşturulmamış.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Tarih</th>
                <th className="p-2 border">Müşteri</th>
                <th className="p-2 border">Toplam</th>
                <th className="p-2 border">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="p-2 border">{invoice.date}</td>
                  <td className="p-2 border">{invoice.customerName}</td>
                  <td className="p-2 border">{invoice.total}₺</td>
                  <td className="p-2 border text-center">
                    <button className="text-blue-600 underline text-sm mr-2">
                      Görüntüle
                    </button>
                    <button className="text-red-600 underline text-sm">
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-500 underline"
          >
            ⬅️ Panele Dön
          </button>
        </div>
      </div>
    </div>
  );
}

export default InvoiceHistory;
