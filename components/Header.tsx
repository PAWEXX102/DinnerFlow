"use client";

import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  PROFILE_ROUTE,
} from "@/constants/routes";
import Logo from "@/app/favicon.ico";
import { LinkButton } from "./Button";
import AnmationOpacity from "@/Animation";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/services/firebase";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/provider/AuthProvider";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user }: any = AuthContext();
  const [BgTransparent, setBgTransparent] = useState(true);
  window.onscroll = () => {
    if (window.scrollY > 1) {
      setBgTransparent(false);
    } else {
      setBgTransparent(true);
    }
  };

  const logOut = () => {
    signOut(auth)
      .then((response) => {
        router.push(LOGIN_ROUTE);
      })
      .catch((e) => {
        console.log("Logout Catch ", e.message);
      });
  };

  return (
    <nav
      className={`fixed z-40 flex justify-between font-bold w-full items-center text-center py-5 px-[6%] ${
        BgTransparent ? "bg-transparent" : "bg-white"
      }`}
    >
      <AnmationOpacity>
        <div className=" flex gap-x-3">
          <LinkButton
            label="Dinner Flow"
            href="/"
            className="text-2xl "
          ></LinkButton>
          <Image
            src={Logo}
            alt="logo"
            width={50}
            height={50}
            className="sm:block hidden"
          />
        </div>
      </AnmationOpacity>
      <ul className="flex gap-4 relative">
        <AnmationOpacity>
          <LinkButton
            label={
              user.isLogin && pathname === PROFILE_ROUTE
                ? "Wyloguj się"
                : "Zacznij Teraz"
            }
            href={!user.isLogin ? LOGIN_ROUTE : PROFILE_ROUTE}
            onClick={user.isLogin ? logOut : undefined}
            className={` bg-black text-white px-6 py-3 rounded-lg hover:text-black hover:bg-white hover:border-black border-[2px] border-black ${
              pathname === LOGIN_ROUTE || pathname === REGISTER_ROUTE
                ? "hidden"
                : ""
            }`}
          ></LinkButton>
        </AnmationOpacity>
      </ul>
    </nav>
  );
};
export default Header;
