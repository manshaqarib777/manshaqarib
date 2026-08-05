"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/constants/site";
import { cn } from "@/lib/utils";

interface LiveClockProps {
  /** IANA zone. Defaults to the site owner's zone from SITE. */
  timeZone?: string;
  label?: string;
  className?: string;
}

/**
 * Live local time — a small "someone is actually here" signal.
 *
 * Rendered empty on the server and filled after mount: formatting a clock during
 * SSR would guarantee a hydration mismatch, since the two renders happen at
 * different instants.
 */
export function LiveClock({
  timeZone = SITE.timeZone,
  label,
  className,
}: LiveClockProps) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone,
      }).format(new Date());

    setTime(format());
    const id = window.setInterval(() => setTime(format()), 15_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return (
    <span className={cn("tabular-nums", className)}>
      {label ? `${label} ` : ""}
      {/* Reserve the glyph width so the row doesn't shift when time arrives. */}
      <span className="inline-block min-w-[4.2ch]">{time ?? "--:--"}</span>
    </span>
  );
}
