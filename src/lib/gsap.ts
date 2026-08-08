"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

/**
 * Central GSAP entry point. Plugins are registered exactly once here and every
 * component imports `gsap` from this module rather than the package, so no
 * component can accidentally animate before ScrollTrigger exists.
 */
// ES modules are evaluated once per graph, so this runs exactly once — no guard
// flag needed beyond skipping the server, where ScrollTrigger has no document.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);

  gsap.defaults({ ease: "expo.out", duration: 0.9 });

  // ScrollTrigger recalculates on resize; ignoring mobile URL-bar-driven
  // height changes prevents a jarring re-layout mid-scroll on iOS.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, useGSAP };
