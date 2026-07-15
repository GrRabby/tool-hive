const sections = [
  {
    title: "What ToolHive is",
    body: "ToolHive is a directory that connects members who own tools and equipment with members who'd like to borrow them. We are not a party to any borrowing arrangement — agreements about pickup, return, and condition are made directly between members.",
  },
  {
    title: "Listing responsibly",
    body: "When you list a tool, the description, condition, and price you provide should be accurate. Listings for anything dangerous, illegal, or requiring a license we don't verify are not permitted.",
  },
  {
    title: "Borrowing responsibly",
    body: "If you borrow a tool, you're responsible for returning it in the condition you received it, by the time you agreed with the owner. Any damage or loss should be resolved directly with the owner.",
  },
  {
    title: "Account standing",
    body: "We may remove listings or suspend accounts that involve fraud, harassment, or repeated no-shows reported by other members.",
  },
  {
    title: "Limitation of liability",
    body: "ToolHive provides the platform for connecting members but isn't responsible for the condition, safety, or legality of items listed, or for disputes between members.",
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-bold text-ink">Terms of Service</h1>
      <p className="mt-2 text-sm text-ink-soft">Last updated July 2026</p>

      <div className="mt-8 space-y-8">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-xl font-bold text-ink">{s.title}</h2>
            <p className="mt-2 text-ink-soft">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
