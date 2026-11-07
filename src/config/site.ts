export const site = {
  name: "CIVITA",
  fullName:
    "Computational Infrastructure for Validation, Integration, Testing, and Assessment",
  title: "CIVITA | Computational Modeling of Concrete",
  description:
    "CIVITA is an open scientific platform for experimental data, calibration, validation, and benchmarking of computational models for concrete.",
  logo: {
    src: "/images/civita-logo.png",
    alt: "CIVITA logo",
    width: 1254,
    height: 1254,
  },
} as const;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/contribute", label: "Contribute" },
  { href: "/documentation", label: "Documentation" },
  { href: "/about", label: "About" },
] as const;
