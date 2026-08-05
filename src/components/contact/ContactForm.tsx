"use client";

import { useRef, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import {
  BUDGET_OPTIONS,
  validateContact,
  type ContactErrors,
  type ContactPayload,
} from "@/lib/validation";
import { EASE } from "@/constants/motion";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const EMPTY: ContactPayload = { name: "", email: "", budget: "", message: "" };

/**
 * Contact form.
 *
 * Validation runs on submit and then per-field on blur once a field has been
 * touched — validating on every keystroke shouts at people mid-word.
 *
 * Errors are wired with `aria-invalid` + `aria-describedby` and announced through
 * a live region, so a screen-reader user learns about a rejected field without
 * having to hunt for it.
 */
export function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(EMPTY);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Success reveal: form clears out, confirmation draws itself in.
  useGSAP(
    () => {
      if (status !== "success" || prefersReducedMotion) return;

      const timeline = gsap.timeline({ defaults: { ease: EASE.out } });
      timeline
        .from(successRef.current, { autoAlpha: 0, y: 24, duration: 0.8 })
        .from(
          "[data-success-tick]",
          { scale: 0, rotate: -35, duration: 0.9, ease: "elastic.out(1, 0.6)" },
          0.1,
        )
        .from(
          "[data-success-line]",
          { autoAlpha: 0, y: 14, duration: 0.7, stagger: 0.08 },
          0.25,
        );

      return () => timeline.kill();
    },
    { dependencies: [status, prefersReducedMotion] },
  );

  const update = (field: keyof ContactPayload, value: string) => {
    setValues((previous) => ({ ...previous, [field]: value }));
    // Clear an existing error as soon as the field changes: keeping a stale error
    // visible while someone is fixing it is needlessly hostile.
    if (errors[field]) {
      setErrors((previous) => ({ ...previous, [field]: undefined }));
    }
  };

  const validateField = (field: keyof ContactPayload) => {
    setTouched((previous) => ({ ...previous, [field]: true }));
    const result = validateContact(values);
    setErrors((previous) => ({ ...previous, [field]: result.errors[field] }));
  };

  const shake = () => {
    if (prefersReducedMotion) return;
    gsap.fromTo(
      formRef.current,
      { x: -7 },
      { x: 0, duration: 0.55, ease: "elastic.out(1.6, 0.4)" },
    );
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = validateContact(values);
    if (!result.isValid) {
      setErrors(result.errors);
      setTouched({ name: true, email: true, message: true, budget: true });
      setStatus("error");
      setServerMessage(null);
      shake();
      return;
    }

    setStatus("submitting");
    setServerMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.value),
      });

      const data: { ok: boolean; errors?: ContactErrors; message?: string } =
        await response.json();

      if (!response.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setStatus("error");
        setServerMessage(
          data.message ?? "Something went wrong on my end. Try email instead?",
        );
        shake();
        return;
      }

      setStatus("success");
      setValues(EMPTY);
      setTouched({});
      setErrors({});
    } catch {
      setStatus("error");
      setServerMessage(
        "Couldn't reach the server. Check your connection, or email me directly.",
      );
      shake();
    }
  };

  if (status === "success") {
    return (
      <div
        ref={successRef}
        role="status"
        className="flex flex-col items-start gap-5 rounded-2xl border border-accent-400/25 bg-accent-500/[0.06] p-8 sm:p-10"
      >
        <span
          data-success-tick
          className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-400 text-ink-950"
        >
          <FiCheck className="h-6 w-6" aria-hidden />
        </span>
        <h3 data-success-line className="text-2xl text-white sm:text-3xl">
          Message received.
        </h3>
        <p data-success-line className="max-w-md text-ink-200">
          Thanks — I read everything myself and usually reply within two working
          days. If it&rsquo;s urgent, email is faster.
        </p>
        <div data-success-line>
          <Button variant="outline" size="sm" onClick={() => setStatus("idle")}>
            Send another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="contact-name"
          label="Name"
          value={values.name}
          error={touched.name ? errors.name : undefined}
          onChange={(value) => update("name", value)}
          onBlur={() => validateField("name")}
          autoComplete="name"
        />
        <Field
          id="contact-email"
          label="Email"
          type="email"
          value={values.email}
          error={touched.email ? errors.email : undefined}
          onChange={(value) => update("email", value)}
          onBlur={() => validateField("email")}
          autoComplete="email"
        />
      </div>

      {/* Budget: a radio group styled as chips — clearer than a native select on
          mobile, and it keeps arrow-key navigation for free. */}
      <fieldset className="flex flex-col gap-3">
        <legend className="label-meta">Budget (optional)</legend>
        <div className="flex flex-wrap gap-2">
          {BUDGET_OPTIONS.map((option) => {
            const isSelected = values.budget === option;
            return (
              <label
                key={option}
                className={cn(
                  "cursor-pointer rounded-full border px-4 py-2 text-[0.78rem] transition-colors duration-400",
                  isSelected
                    ? "border-accent-400/50 bg-accent-500/12 text-white"
                    : "border-white/12 text-ink-200 hover:border-white/30 hover:text-white",
                  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-400",
                )}
              >
                <input
                  type="radio"
                  name="budget"
                  value={option}
                  checked={isSelected}
                  onChange={() => update("budget", option)}
                  className="sr-only"
                />
                {option}
              </label>
            );
          })}
        </div>
      </fieldset>

      <Field
        id="contact-message"
        label="Project"
        multiline
        value={values.message}
        error={touched.message ? errors.message : undefined}
        onChange={(value) => update("message", value)}
        onBlur={() => validateField("message")}
      />

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" withArrow isLoading={status === "submitting"}>
          {status === "submitting" ? "Sending" : "Send enquiry"}
        </Button>

        {/* Live region: submission outcome is announced, not just coloured. */}
        <p role="status" aria-live="polite" className="text-[0.85rem] text-ink-400">
          {status === "error" && serverMessage
            ? serverMessage
            : status === "error"
              ? "Please check the highlighted fields."
              : ""}
        </p>
      </div>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  type?: string;
  multiline?: boolean;
  autoComplete?: string;
}

/**
 * Floating-label input. The label sits inside the field and rises on focus or
 * when filled — no placeholder, so the label is never lost once typing starts.
 */
function Field({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  multiline,
  autoComplete,
}: FieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isRaised = isFocused || value.length > 0;
  const errorId = `${id}-error`;

  const shared = {
    id,
    value,
    autoComplete,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
    onFocus: () => setIsFocused(true),
    onBlur: () => {
      setIsFocused(false);
      onBlur();
    },
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => onChange(event.target.value),
    className: cn(
      "peer w-full bg-transparent pt-6 pb-2 text-[1rem] text-white outline-none",
      "transition-colors duration-500 placeholder:text-transparent",
    ),
  };

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-0 origin-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isRaised
            ? "top-0 text-[0.68rem] uppercase tracking-[0.18em] text-ink-400"
            : "top-6 text-[0.98rem] text-ink-400",
        )}
      >
        {label}
      </label>

      {multiline ? (
        <textarea {...shared} rows={5} className={cn(shared.className, "resize-none")} />
      ) : (
        <input {...shared} type={type} />
      )}

      {/* Underline that wipes in on focus. */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 bottom-0 h-px",
          error ? "bg-red-400/70" : "bg-white/14",
        )}
      >
        <span
          className={cn(
            "block h-full origin-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            error ? "bg-red-400" : "bg-accent-400",
            isFocused ? "scale-x-100" : "scale-x-0",
          )}
        />
      </span>

      {error && (
        <p id={errorId} className="mt-2 text-[0.8rem] text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
