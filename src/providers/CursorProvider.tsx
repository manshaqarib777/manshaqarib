"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import { useIsTouch } from "@/hooks/useMediaQuery";

export type CursorVariant = "default" | "hover" | "text" | "image" | "drag";

export interface CursorState {
  variant: CursorVariant;
  /** Shown inside the cursor in `text` / `image` modes. */
  label?: string;
  /** Image src for `image` mode previews. */
  image?: string;
}

interface CursorContextValue extends CursorState {
  setCursor: (next: CursorState) => void;
  resetCursor: () => void;
}

const DEFAULT_STATE: CursorState = { variant: "default" };

const CursorContext = createContext<CursorContextValue>({
  ...DEFAULT_STATE,
  setCursor: () => {},
  resetCursor: () => {},
});

export const useCursor = () => useContext(CursorContext);

/**
 * Convenience spread for any interactive element:
 * `<a {...useCursorProps({ variant: "text", label: "View" })}>`
 */
export function useCursorProps(state: CursorState) {
  const { setCursor, resetCursor } = useCursor();
  return useMemo(
    () => ({
      onMouseEnter: () => setCursor(state),
      onMouseLeave: () => resetCursor(),
      // Keyboard users get the same affordance without a floating cursor.
      onFocus: () => setCursor(state),
      onBlur: () => resetCursor(),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setCursor, resetCursor, state.variant, state.label, state.image],
  );
}

// The cursor is pure decoration: never server-rendered, never shipped to the
// initial bundle.
const Cursor = dynamic(() => import("@/components/ui/Cursor"), { ssr: false });

export function CursorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CursorState>(DEFAULT_STATE);
  const isTouch = useIsTouch();

  const setCursor = useCallback((next: CursorState) => setState(next), []);
  const resetCursor = useCallback(() => setState(DEFAULT_STATE), []);

  const value = useMemo<CursorContextValue>(
    () => ({ ...state, setCursor, resetCursor }),
    [state, setCursor, resetCursor],
  );

  return (
    <CursorContext.Provider value={value}>
      {children}
      {!isTouch && <Cursor />}
    </CursorContext.Provider>
  );
}
