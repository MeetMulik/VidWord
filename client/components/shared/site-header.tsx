"use client";

import Link from "next/link";
import { Edit, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MainNav } from "@/components/shared/main-nav";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between space-x-4 px-6 sm:space-x-0">
        <MainNav />
        <div className=" hidden lg:flex lg:items-center lg:space-x-7">
          {/* <Link href="/generate">Generate</Link> */}
          <Link href="/about">About</Link>
          <Link href="/chat">Chat</Link>
          <Link href="/history">History</Link>
        </div>
        <div className="hidden lg:flex lg:items-center lg:space-x-1">
          <Link href="/">
            <Button size="sm" variant="ghost">
              <ShoppingBag className="h-5 w-5" />
              <span className="ml-2 text-sm font-bold">0</span>
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
