"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in every field.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Enter a valid email address.");
      return;
    }
    setError("");
    
    
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl font-bold text-ink">Get in touch</h1>
      <p className="mt-2 max-w-xl text-ink-soft">
        Questions, feedback, or a problem with a listing? Send us a message.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-5">
        <form onSubmit={handleSubmit} className="space-y-4 rounded-[10px] border border-ink/10 bg-white p-6 shadow-sm md:col-span-3" noValidate>
          {error && (
            <p className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          )}
          {sent && (
            <p className="rounded border border-moss/20 bg-moss/5 px-3 py-2 text-sm text-moss">
              Thanks — your message has been sent. We'll reply within a couple of days.
            </p>
          )}

          <div>
            <label htmlFor="name" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Name
            </label>
            <input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="focus-ring w-full rounded border border-ink/15 px-3 py-2.5 text-sm outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="focus-ring w-full rounded border border-ink/15 px-3 py-2.5 text-sm outline-none"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="focus-ring w-full rounded border border-ink/15 px-3 py-2.5 text-sm outline-none"
            />
          </div>

          <button
            type="submit"
            className="focus-ring w-full rounded bg-moss py-3 text-sm font-bold uppercase tracking-wide text-bone hover:bg-moss-dark"
          >
            Send Message
          </button>
        </form>

        <div className="md:col-span-2">
          <div className="rounded-[10px] border border-ink/10 bg-white p-6 shadow-sm">
            <h2 className="font-display text-lg font-bold text-ink">Contact details</h2>
            <ul className="mt-4 space-y-3 text-sm text-ink-soft">
              <li>
                <span className="block text-xs font-semibold uppercase tracking-wide text-ink-soft/70">Email</span>
                hello@toolhive.community
              </li>
              <li>
                <span className="block text-xs font-semibold uppercase tracking-wide text-ink-soft/70">Phone</span>
                +880 1234-567890
              </li>
              <li>
                <span className="block text-xs font-semibold uppercase tracking-wide text-ink-soft/70">Location</span>
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
