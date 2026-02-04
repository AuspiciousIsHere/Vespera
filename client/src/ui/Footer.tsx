import { FiDribbble, FiTwitter, FiTwitch, FiGithub } from "react-icons/fi";
import { Link } from "react-router";

import { Separator } from "@/components/ui/separator";

const footerLinks = [
  { title: "Overview", href: "#" },
  { title: "Features", href: "#" },
  { title: "Pricing", href: "#" },
  { title: "Careers", href: "#" },
  { title: "Help", href: "#" },
  { title: "Privacy", href: "#" },
];

const Footer = () => {
  return (
    <footer className="border-t flex flex-col w-full">
      <div className="py-12 flex flex-col justify-between items-center bg-linear-20 from-secondary to-secondary dark:from-secondary/20 dark:to-secondary/10">
        <div className="flex items-center">
          <img src="vespera-logo.png" alt="logo" className="size-20" />
          <h2 className="font-extrabold text-3xl">VESPERA</h2>
        </div>

        <ul className="mt-6 flex items-center gap-4 flex-wrap">
          {footerLinks.map(({ title, href }) => (
            <li key={title}>
              <Link to={href} className="text-muted-foreground hover:text-foreground">
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Separator />

      <div className="px-6 py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5">
        {/* Copyright */}
        <span className="text-muted-foreground">
          &copy; {new Date().getFullYear()}{" "}
          <Link to="/" target="_blank">
            Shadcn UI Blocks
          </Link>
          . All rights reserved.
        </span>

        <div className="flex items-center gap-5 text-muted-foreground">
          <Link to="#" target="_blank">
            <FiTwitter className="size-5" />
          </Link>
          <Link to="#" target="_blank">
            <FiDribbble className="size-5" />
          </Link>
          <Link to="#" target="_blank">
            <FiTwitch className="size-5" />
          </Link>
          <Link to="#" target="_blank">
            <FiGithub className="size-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
