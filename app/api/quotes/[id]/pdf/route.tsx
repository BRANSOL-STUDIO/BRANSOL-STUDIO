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
  const { data: quote, error } = await supabase
    .from("quotes")
    .select("*, quote_items(*), organisations(name)")
    .eq("id", id)
    .single();

  if (error || !quote) {
    return new Response("Not found", { status: 404 });
  }

  const org = quote as { organisations?: { name: string } };
  const items = (quote as { quote_items?: { name: string; quantity: number; rate: number }[] }).quote_items ?? [];
  const total = items.reduce((sum, i) => sum + i.quantity * i.rate, 0);

  const Doc = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>QUOTATION {quote.id}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>To:</Text>
          <Text>{org.organisations?.name ?? ""}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Valid until:</Text>
          <Text>{quote.valid_until ?? ""}</Text>
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
      "Content-Disposition": `attachment; filename="bransol-quote-${id}.pdf"`,
    },
  });
}
