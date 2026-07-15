import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <img
            src="/Logo.png"
            alt="ToolHive Logo"
            height={50}
            width={50}
          />
          <span className="text-lg font-bold tracking-tight text-[rgb(254,154,0)] transition-colors group-hover:text-[rgb(255,180,60)]">
            ToolHive
          </span>
            </div>
            <p className="mt-3 text-sm text-bone/70">
              Borrow before you buy. A community library for tools and equipment,
              shared by neighbors.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-amber">
              Explore
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-bone/80">
              <li><Link href="/tools" className="focus-ring rounded hover:text-amber">Browse tools</Link></li>
              <li><Link href="/items/add" className="focus-ring rounded hover:text-amber">List a tool</Link></li>
              <li><Link href="/about" className="focus-ring rounded hover:text-amber">About us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-amber">
              Support
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-bone/80">
              <li><Link href="/contact" className="focus-ring rounded hover:text-amber">Contact us</Link></li>
              <li><Link href="/login" className="focus-ring rounded hover:text-amber">Login</Link></li>
              <li><Link href="/register" className="focus-ring rounded hover:text-amber">Create account</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-amber">
              Contact
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-bone/80">
              <li>hello@toolhive.community</li>
              <li>+880 1234-567890</li>
              <li>Dhaka, Bangladesh</li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="focus-ring flex h-8 w-8 items-center justify-center rounded-full border border-bone/30 hover:border-amber hover:text-amber">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-2.9h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6v1.9H16l-.4 2.9h-2.1v7A10 10 0 0022 12z" /></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="focus-ring flex h-8 w-8 items-center justify-center rounded-full border border-bone/30 hover:border-amber hover:text-amber">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.7 0 3.1 0 4.1.1 1 .1 1.7.2 2.3.5.6.2 1.1.6 1.6 1.1.5.5.8.9 1.1 1.6.3.6.4 1.3.5 2.3.1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c-.1 1-.2 1.7-.5 2.3a4.6 4.6 0 01-1.1 1.6 4.6 4.6 0 01-1.6 1.1c-.6.3-1.3.4-2.3.5-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1-.1-1.7-.2-2.3-.5a4.6 4.6 0 01-1.6-1.1 4.6 4.6 0 01-1.1-1.6c-.3-.6-.4-1.3-.5-2.3C2 15.1 2 14.7 2 12s0-3.1.1-4.1c.1-1 .2-1.7.5-2.3.2-.6.6-1.1 1.1-1.6.5-.5.9-.8 1.6-1.1.6-.3 1.3-.4 2.3-.5C8.9 2 9.3 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.3a3.3 3.3 0 110-6.6 3.3 3.3 0 010 6.6zm5.2-8.5a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" /></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="focus-ring flex h-8 w-8 items-center justify-center rounded-full border border-bone/30 hover:border-amber hover:text-amber">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 00-7 3.7A11.6 11.6 0 013 4.9a4.1 4.1 0 001.3 5.5c-.7 0-1.3-.2-1.9-.5v.1c0 2 1.4 3.6 3.3 4a4.1 4.1 0 01-1.9.1 4.1 4.1 0 003.8 2.8A8.2 8.2 0 012 18.4a11.6 11.6 0 006.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-bone/10 pt-6 text-xs text-bone/60 sm:flex-row">
          <p>© {new Date().getFullYear()} ToolHive. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="focus-ring rounded hover:text-amber">Privacy</Link>
            <Link href="/terms" className="focus-ring rounded hover:text-amber">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
