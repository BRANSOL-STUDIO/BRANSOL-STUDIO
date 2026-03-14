import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Document, Page, Text, View, StyleSheet, renderToBuffer } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Helvetica" },
  title: { fontSize: 18, marginBottom: 20 },
  row: { flexDirection: "row", marginBottom: 8 },
  label: { width: 120 },
  total: { marginTop: 20, fontSize: 14, fontWeight: "bold" },
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: invoice, error } = await supabase
    .from("invoices")
    .select("*, invoice_items(*), organisations(name, address)")
    .eq("id", id)
    .single();

  if (error || !invoice) {
    return new Response("Not found", { status: 404 });
  }

  const org = invoice as { organisations?: { name: string; address: string | null } };
  const items = (invoice as { invoice_items?: { name: string; description: string | null; quantity: number; rate: number }[] }).invoice_items ?? [];
  const total = items.reduce((sum, i) => sum + i.quantity * i.rate, 0);

  const Doc = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>INVOICE {invoice.id}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>To:</Text>
          <Text>{org.organisations?.name ?? ""}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text>{invoice.date ?? ""}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Due:</Text>
          <Text>{invoice.due_date ?? ""}</Text>
        </View>
        {items.map((item, i) => (
          <View key={i} style={styles.row}>
            <Text>{item.name} × {item.quantity} @ {item.rate}</Text>
          </View>
        ))}
        <Text style={styles.total}>Total: R {total.toFixed(2)}</Text>
      </Page>
    </Document>
  );

  const buffer = await renderToBuffer(<Doc />);
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="bransol-invoice-${id}.pdf"`,
    },
  });
}
