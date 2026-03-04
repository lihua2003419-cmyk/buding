import Link from "next/link";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

export const Header = () => {
  return (
    <div className="fixed z-50 pt-8 md:pt-14 top-0 left-0 w-full">
      <header className="flex items-center justify-center container">
        <nav className="flex max-lg:hidden items-center justify-center gap-x-10">
          {["资讯", "播客", "留言", "关于"].map((item) => (
            <Link
              className="uppercase inline-block font-mono text-foreground/60 hover:text-foreground/100 duration-150 transition-colors ease-out"
              href={`#${item === "资讯" ? "news" : item === "播客" ? "podcasts" : item === "留言" ? "guestbook" : "about"}`}
              key={item}
            >
              {item}
            </Link>
          ))}
        </nav>
        <MobileMenu />
      </header>
    </div>
  );
};
