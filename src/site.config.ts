import type { MenuLink, SiteConfig } from "@types";

export const menuLinks: MenuLink[] = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/posts/",
    title: "Blog",
  },
  {
    path: "/portfolio/",
    title: "Portfolio",
  },
  {
    path: "/resume/",
    title: "Resume",
  },
  {
    path: "/about/",
    title: "About",
  },
];

export const siteConfig: SiteConfig = {
  locale: "en-US",
  authorName: "Enrique Quero",
  obfuscatedEmail: "equero [at] pm [dot] me",
  jobTitle: "Senior Software Engineer",
  siteTitle: "Enrique Quero",
  motto: "Never stop learning",
  siteCreationYear: "2024",
  siteUrl: "https://equero.dev",
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/equerodev/",
    github: "https://www.github.com/equero",
    x: "https://x.com/equerodev",
  },
  // Contact information and availability
  location: "Madrid, Spain",
  timezone: "CET (UTC+1)",
  availableForWork: true,
  workAvailability: {
    freelance: true,
    fullTime: true,
    remote: true,
    hybrid: true,
  },
  get copyrightYear() {
    return `${this.siteCreationYear}-${new Date().getFullYear().toString().slice(-2)}`;
  },
};
