import type { ComponentType, ReactNode, Ref } from "react";

/**
 * Props a polymorphic wrapper needs to forward to whatever element it renders.
 */
export interface PolymorphicProps {
  ref?: Ref<HTMLElement>;
  id?: string;
  className?: string;
  children?: ReactNode;
  "aria-label"?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

/**
 * A single component type accepting exactly `PolymorphicProps`.
 *
 * `ElementType` is a very large union, and TypeScript resolves the props of a
 * union of element types to the *intersection* of their prop types — which
 * collapses `children` and `ref` to `never`, and (with the union widened by a
 * props parameter) can exceed the union-complexity limit outright.
 *
 * Collapsing the tag to one component signature avoids both problems. JSX only
 * forwards the value to `createElement`, which accepts a tag string just as
 * happily as a component, so `as="h2"` still renders an `<h2>` at runtime:
 *
 *   const Tag = as as unknown as PolymorphicTag;
 */
export type PolymorphicTag = ComponentType<PolymorphicProps>;
