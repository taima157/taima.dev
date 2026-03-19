import Link from "next/link";

export function Header() {
  return (
    <header className="flex max-w-200 w-full justify-end">
      <nav className="font-mono uppercase flex gap-5">
        <Link href="/">
          <span className="hover:underline">home</span>
        </Link>
        <Link href="/contact">
          <span className="hover:underline">contact</span>
        </Link>
      </nav>
    </header>
  );
}
