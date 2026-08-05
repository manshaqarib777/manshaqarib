"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface LoadingContextValue {
  /** True until the preloader's exit transition has finished. */
  isLoading: boolean;
  /** Flipped by the preloader; hero + WebGL wait on this to start. */
  isRevealing: boolean;
  beginReveal: () => void;
  completeLoad: () => void;
}

const LoadingContext = createContext<LoadingContextValue>({
  isLoading: true,
  isRevealing: false,
  beginReveal: () => {},
  completeLoad: () => {},
});

export const useLoading = () => useContext(LoadingContext);

/**
 * Coordinates the hand-off between preloader and page. The preloader drives the
 * flags; every entrance animation on the page is gated on `isRevealing` so the
 * hero timeline starts precisely as the overlay lifts rather than behind it.
 */
export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRevealing, setIsRevealing] = useState(false);

  const beginReveal = useCallback(() => setIsRevealing(true), []);
  const completeLoad = useCallback(() => setIsLoading(false), []);

  const value = useMemo<LoadingContextValue>(
    () => ({ isLoading, isRevealing, beginReveal, completeLoad }),
    [isLoading, isRevealing, beginReveal, completeLoad],
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}
