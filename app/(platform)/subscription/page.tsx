import { createClient } from "@/lib/supabase/server";

export default async function SubscriptionPage() {
  const supabase = await createClient();
  // Assume current user's org; in real app get from profile
  const { data: org } = await supabase
    .from("organisations")
    .select("tier, mrr, renewal_date")
    .limit(1)
    .single();

  return (
    <div className="space-y-8">
      <h1
        className="text-2xl font-bold tracking-tight"
        style={{ fontFamily: "var(--font-syne)", color: "var(--text-pri)" }}
      >
        Subscription
      </h1>
      <div
        className="p-8 rounded-xl border max-w-md"
        style={{ background: "var(--glass-bg)", borderColor: "var(--glass-border)" }}
      >
        <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--text-ter)" }}>
          Current tier
        </p>
        <p className="text-xl font-semibold" style={{ color: "var(--text-pri)" }}>
          {org?.tier ?? "—"}
        </p>
        {org?.renewal_date && (
          <p className="text-sm mt-2" style={{ color: "var(--text-sec)" }}>
            Renewal: {new Date(org.renewal_date).toLocaleDateString("en-ZA")}
          </p>
        )}
      </div>
    </div>
  );
}
