import Link from "next/link";

import { Icons } from "@/components/shared/icons";
import Image from "next/image";
import { MobileNav } from "./mobile-nav";

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10 ">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src={"/logo.svg"}
          width={16}
          height={16}
          className="h-7 w-7"
          alt="logo"
        />
        <span className="inline-block text-xl font-bold">VidWord</span>
      </Link>
      <div className=" lg:hidden">
        <MobileNav />
      </div>
    </div>
  );
}
