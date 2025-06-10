import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";


Font.register({ family: "Roboto", src: "https://fonts.gstatic.com/s/roboto..." })

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: "Helvetica" },
  section: { marginBottom: 10 },
  heading: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  table: { width: "100%", marginTop: 10 },
  row: { flexDirection: "row", borderBottom: "1px solid #ccc", padding: 4 },
  col: { width: "33%" },
  total: { textAlign: "right", marginTop: 10, fontWeight: "bold" },
});

export function InvoicePDF({ invoice }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Fatura</Text>
          <Text>Müşteri: {invoice.customerName}</Text>
          <Text>
            Tarih:{" "}
            {invoice.createdAt?.toDate
              ? invoice.createdAt.toDate().toLocaleDateString("tr-TR")
              : invoice.createdAt}
          </Text>
        </View>

        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.col}>Ürün</Text>
            <Text style={styles.col}>Adet</Text>
            <Text style={styles.col}>Fiyat</Text>
          </View>

          {invoice.items.map((item, i) => (
            <View style={styles.row} key={i}>
              <Text style={styles.col}>{item.name}</Text>
              <Text style={styles.col}>{item.quantity}</Text>
              <Text style={styles.col}>{item.price} ₺</Text>
            </View>
          ))}
        </View>

        <Text style={styles.total}>Toplam: {invoice.total.toFixed(2)} ₺</Text>
      </Page>
    </Document>
  );
}
