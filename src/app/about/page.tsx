import Link from "next/link";

const values = [
  {
    title: "Neighbors first",
    body: "Every listing comes from someone nearby, not a warehouse. You're borrowing from people, not a company.",
  },
  {
    title: "Less waste, more use",
    body: "Most tools sit idle 90% of the time. ToolHive helps the ones already out there get used more, instead of everyone buying their own.",
  },
  {
    title: "No middleman fees",
    body: "Owners set their own rates, borrowers pay owners directly. We don't take a cut of what you agree on.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-moss py-16 text-bone">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="font-display text-5xl font-bold">About ToolHive</h1>
          <p className="mt-4 max-w-2xl text-lg text-bone/80">
            We started ToolHive with a simple observation: most of the tools and
            equipment people own spend almost all their time sitting unused in a
            shed, closet, or garage.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-3xl font-bold text-ink">Why we built this</h2>
        <p className="mt-4 text-ink-soft">
          A drill gets used for maybe a few hours a year. A pressure washer,
          even less. Meanwhile, a neighbor two streets over is about to spend
          money buying the exact same thing for a single weekend project.
          ToolHive exists to close that gap — connecting people who already
          own something with people who need it for a short time.
        </p>
        <p className="mt-4 text-ink-soft">
          It's not a rental company. There's no warehouse, no fleet of gear we
          manage. It's a directory built by and for the community using it —
          every listing is posted by a real neighbor, priced by them, and
          handed over in person.
        </p>

        <h2 className="mt-12 font-display text-3xl font-bold text-ink">What we believe</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-[10px] border border-ink/10 bg-white p-5 shadow-sm">
              <h3 className="font-display text-lg font-bold text-ink">{v.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{v.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[10px] border-2 border-dashed border-amber bg-amber/10 p-8 text-center">
          <h2 className="font-display text-2xl font-bold text-ink">Ready to join in?</h2>
          <p className="mt-2 text-ink-soft">Browse what's already available, or list something of your own.</p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/tools" className="focus-ring rounded border-2 border-moss px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-moss hover:bg-moss hover:text-bone">
              Browse Tools
            </Link>
            <Link href="/items/add" className="focus-ring rounded bg-moss px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-bone hover:bg-moss-dark">
              List a Tool
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
