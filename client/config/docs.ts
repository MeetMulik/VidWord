interface MainNavItem {
  title: string;
  href: string;
}

interface DocsConfig {
  mainNav: MainNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Generate",
      href: "/generate",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ],
};
