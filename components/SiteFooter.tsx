import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 py-6 text-xs text-neutral-500 sm:flex-row sm:justify-between">
        <span>© {new Date().getFullYear()} The Malayalam Times</span>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-red-600">
            Privacy
          </Link>
          <Link href="#" className="hover:text-red-600">
            Terms
          </Link>
          <Link href="#" className="hover:text-red-600">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
