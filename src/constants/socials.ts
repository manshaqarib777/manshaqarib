import { FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import type { SocialLink } from "@/types";
import { SITE } from "./site";

export const SOCIALS: SocialLink[] = [
  {
    label: "GitHub",
    handle: "@manshaqarib777",
    href: "https://github.com/manshaqarib777",
    icon: FiGithub,
    external: true,
  },
  {
    label: "LinkedIn",
    handle: "/in/manshaqarib",
    href: "https://linkedin.com/in/manshaqarib",
    icon: FiLinkedin,
    external: true,
  },
  {
    label: "Email",
    handle: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: FiMail,
    external: false,
  },
  {
    label: "Phone",
    handle: SITE.phone,
    // tel: strips spaces so the dialler gets a clean number.
    href: `tel:${SITE.phone.replace(/\s/g, "")}`,
    icon: FiPhone,
    external: false,
  },
];
