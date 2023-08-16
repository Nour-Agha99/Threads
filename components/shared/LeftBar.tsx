"use client";

import { sidebarLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

const LeftBar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const {userId} = useAuth();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        <div>
          {sidebarLinks.map((link) => {
            const isActive =
              (pathName.includes(link.route) && link.route.length > 1) ||
              link.route === pathName;

              if(link.route === '/profile') link.route = `/profile/${userId}`
            return (
              <Link
                href={link.route}
                className={`leftsidebar_link ${
                  isActive ? "bg-primary-500" : "bg-inherit"
                }`}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                />
                <p className="text-light-1 max-lg:hidden">{link.label}</p>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="w-full px-6">
        <SignOutButton signOutCallback={()=>router.push('/sign-in')}>
          <div className="leftsidebar_link cursor-pointer">
            <Image src="/logout.svg" alt="logout" width={24} height={24} className="pl-1"/>
            <p className="flex w-full flex-1 flex-col text-light-2 max-lg:hidden pr-6">Logout</p>
          </div>
        </SignOutButton>
      </div>
    </section>
  );
};

export default LeftBar;
