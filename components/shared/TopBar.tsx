import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SignedIn,
  SignOutButton,
  OrganizationSwitcher,
  currentUser,
} from "@clerk/nextjs";
import PersonalProfile from "./PersonalProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";


const TopBar = async() => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);

  if (!userInfo || !userInfo.onboard) {
    redirect("/onboarding");
  }

  return (
    <nav className="topbar" style={{ height: "72px" }}>
      <Link href="/" className="flex items-center gap-4">
        <Image src="/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Threads</p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image src="/logout.svg" alt="logout" width={24} height={24} />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <div>
          <PersonalProfile name={userInfo.name}/>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
