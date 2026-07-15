const sections = [
  {
    title: "What we collect",
    body: "When you create an account, we store your name, email address, and a securely hashed password. When you list a tool, we store the listing details you provide, including its approximate location.",
  },
  {
    title: "How we use it",
    body: "Your name and email are shown to other members when they view a listing you've posted, so they can reach you to arrange a borrow. We don't sell your information to third parties or use it for advertising.",
  },
  {
    title: "Location data",
    body: "The location field on a listing is whatever neighborhood or area you choose to enter — we don't track or request your precise device location.",
  },
  {
    title: "Cookies",
    body: "We use a single session cookie to keep you logged in. It's required for the site to function and isn't used for tracking or analytics.",
  },
  {
    title: "Your control",
    body: "You can delete any listing you've posted at any time from My Listings. To delete your account entirely, contact us and we'll remove your data.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-bold text-ink">Privacy Policy</h1>
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
