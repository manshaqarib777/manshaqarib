export interface ContactPayload {
  name: string;
  email: string;
  budget: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

/** Deliberately permissive: rejects obvious typos, not unusual-but-valid addresses. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const BUDGET_OPTIONS = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $60k",
  "$60k+",
  "Not sure yet",
] as const;

/**
 * One validator shared by the client form and the API route.
 *
 * Client-side validation is a courtesy; the route re-runs the exact same
 * function because anything reaching the server over HTTP is untrusted input.
 */
export function validateContact(input: Partial<ContactPayload>): {
  errors: ContactErrors;
  isValid: boolean;
  value: ContactPayload;
} {
  const value: ContactPayload = {
    name: (input.name ?? "").trim(),
    email: (input.email ?? "").trim(),
    budget: (input.budget ?? "").trim(),
    message: (input.message ?? "").trim(),
  };

  const errors: ContactErrors = {};

  if (value.name.length < 2) {
    errors.name = "Please tell me what to call you.";
  } else if (value.name.length > 80) {
    errors.name = "That name is longer than the field allows.";
  }

  if (!EMAIL_PATTERN.test(value.email)) {
    errors.email = "That email address doesn't look right.";
  }

  if (value.message.length < 12) {
    errors.message = "A sentence or two about the project, if you can.";
  } else if (value.message.length > 4000) {
    errors.message = "Please keep it under 4000 characters.";
  }

  if (
    value.budget &&
    !(BUDGET_OPTIONS as readonly string[]).includes(value.budget)
  ) {
    errors.budget = "Please choose one of the listed ranges.";
  }

  return { errors, isValid: Object.keys(errors).length === 0, value };
}
