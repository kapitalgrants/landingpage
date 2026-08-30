import Image from "next/image";
import Link from "next/link";
import SignupInline from "@/components/SignupInline";

export default function Home() {
  return (
    // One screen, no scroll. min-h rather than a fixed h so a very short
    // viewport grows instead of clipping the form off the bottom.
    <main className="relative flex min-h-[100dvh] flex-col overflow-hidden">
      {/* Taller than the viewport on phones and pinned to the bottom, which
          lifts the sun to roughly a third down instead of dead centre. On a
          portrait crop the image height fits exactly, so vertical
          object-position is a no-op and this box is the only way to move it. */}
      <div className="absolute inset-x-0 bottom-0 h-[132%] sm:inset-0 sm:h-full">
        <Image
          src="https://images.unsplash.com/photo-1500534623283-312aade485b7?w=2400&q=80&auto=format&fit=crop"
          alt=""
          fill
          priority
          sizes="100vw"
          // The sun sits right of centre in the source, and a narrow phone
          // crops it out entirely, so shift the crop right on small screens.
          className="object-cover object-[76%_center] sm:object-center"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/70 to-black/25" />

      {/* ---- top ---- */}
      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 sm:py-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-semibold tracking-[0.2em] text-white"
        >
          KAPITAL GRANTS
        </Link>
        <a
          href="mailto:info@kapitalgrants.me"
          className="text-sm text-neutral-300 transition-colors hover:text-white"
        >
          info@kapitalgrants.me
        </a>
      </header>

      {/* ---- centre ---- */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 items-end px-6 pb-10 pt-6 sm:items-center sm:pb-6 lg:px-8">
        <div className="w-full">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-300">
            Every raise starts with a path
          </p>

          <h1 className="max-w-3xl text-balance text-[26px] font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Non-dilutive capital to start.
            <br />
            <span className="text-neutral-400">
              Institutional capital to scale.
            </span>
          </h1>

          <p className="mt-4 max-w-lg text-balance text-sm leading-relaxed text-neutral-300 sm:mt-5 sm:text-base">
            We route founders through grants, accelerators, and our vetted
            network of VCs and family offices.
          </p>

          <div className="mt-5 sm:mt-9">
            <p className="mb-3 text-sm font-medium text-white">
              Subscribe to our newsletter
            </p>
            <SignupInline />
          </div>
        </div>
      </div>

      {/* ---- bottom ---- */}
      <footer className="relative mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-5 sm:py-6 lg:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
          The Sunday Brief
        </p>
        <p className="text-xs text-neutral-500">
          © {new Date().getFullYear()} Kapital Grants
        </p>
      </footer>
    </main>
  );
}
