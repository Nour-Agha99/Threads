"use client"
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BottomBar = () => {
  const pathName = usePathname();
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathName.includes(link.route) && link.route.length > 1) ||
            link.route === pathName;

          return (
            <Link
              href={link.route}
              className={`bottombar_link ${
                isActive ? "bg-primary-500" : "bg-inherit"
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 text-subtle-medium max-sm:hidden">{link.label.split(" ")[0]}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BottomBar;
