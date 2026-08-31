/**
 * Canonical site constants.
 *
 * `url` uses the www host on purpose: the apex (kapitalgrants.me) 308-redirects
 * to www, so www is the address Google should index. Pointing canonicals or the
 * sitemap at the apex would make every URL a redirect hop.
 */
export const site = {
  name: "Kapital Grants",
  url: "https://www.kapitalgrants.me",
  email: "info@kapitalgrants.me",
  tagline: "Non-dilutive capital to start. Institutional capital to scale.",
  description:
    "Kapital Grants routes founders through grants, accelerators, and a vetted network of VCs and family offices — non-dilutive capital to start, institutional capital to scale.",
} as const;
