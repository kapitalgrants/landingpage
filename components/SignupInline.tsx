"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2, Check } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function SignupInline() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(data?.error ?? "Something went wrong. Try again.");
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-center gap-2.5 text-white">
        <Check className="h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
        <p className="text-sm">
          You&apos;re on the list. The first issue arrives Sunday.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-md">
      {/* Row even on phones: stacking cost ~56px of height, which is what was
          pushing the content up over the sun. */}
      <div className="flex flex-row gap-2 sm:gap-3">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@startup.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          aria-invalid={status === "error"}
          aria-describedby="signup-note"
          className="w-full min-w-0 flex-1 border border-white/25 bg-black/30 px-3 py-3 text-sm text-white backdrop-blur-sm placeholder:text-white/40 focus:border-white focus:outline-none disabled:opacity-50 sm:px-4"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex shrink-0 items-center justify-center gap-2 bg-accent px-4 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:px-6"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Joining
            </>
          ) : (
            <>
              Subscribe
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

      <p
        id="signup-note"
        role={status === "error" ? "alert" : undefined}
        className={`mt-3 text-xs ${
          status === "error" ? "text-red-400" : "text-neutral-400"
        }`}
      >
        {status === "error"
          ? errorMessage
          : "Every Sunday. Free, and one click to unsubscribe."}
      </p>
    </form>
  );
}
