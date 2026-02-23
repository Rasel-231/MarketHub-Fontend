"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import BrandImg from "../../../public/Image/bag-outline.png";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { LogOutIcon, Menu, User2Icon, ShoppingCart, Heart } from "lucide-react";
import { cn } from "@/libs/utils";

import { useEffect, useState } from "react";
import { useUserLogoutMutation } from "@/store/api/authApi";
import { useGetCartsQuery } from "@/store/api/cartApi/cartApi";
import { useGetMyProfileQuery } from "@/store/api/userApi/userApi";


const PublicNavbar = () => {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const { data: response, isLoading } = useGetMyProfileQuery();
  const [logout] = useUserLogoutMutation();
  const userData = response?.data;
  const { data: cartResponse } = useGetCartsQuery(undefined);
  const cartItemCount = cartResponse?.data?.items?.length || 0;

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Contact", href: "/contact" },
  ];

  const userProfileImage =
    userData?.admin?.profilePhoto || userData?.seller?.profilePhoto;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <Image
            src={BrandImg}
            alt="MarketHub"
            height={32}
            width={32}
            className="h-7 w-7 object-contain"
          />
          <span className="text-xl font-bold tracking-tight text-foreground">
            MarketHub
          </span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-1 md:gap-2 mr-2">
            <Link href={"/wishlist"}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-9 w-9"
              >
                <Heart className="h-5 w-5 text-muted-foreground" />
              </Button>
            </Link>
            <Link href={"/cart"}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-9 w-9 relative"
              >
                <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                {mounted && cartItemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-background">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isLoading ? (
              <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
            ) : userData ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">
                    {userData.name}
                  </span>
                  <Link href="/account">
                    <div className="relative h-9 w-9 overflow-hidden rounded-full border border-primary/20 bg-muted shadow-sm">
                      {userProfileImage ? (
                        <Image
                          src={userProfileImage}
                          alt={userData.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <User2Icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </Link>
                </div>

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded-md hover:bg-destructive/10"
                >
                  <LogOutIcon className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link href="/login">
                <Button className="bg-primary hover:bg-primary/90">
                  Login
                </Button>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            {mounted ? (
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-transparent h-9 w-9"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] sm:w-[350px] px-6"
                >
                  <SheetHeader className="text-left border-b pb-4 mb-4">
                    <SheetTitle className="flex font-bold text-xl gap-2 items-center">
                      <Image
                        src={BrandImg}
                        alt="Logo"
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                      <span>MarketHub</span>
                    </SheetTitle>
                  </SheetHeader>

                  <nav className="flex flex-col gap-2 mt-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "text-base font-medium py-3 px-2 rounded-md transition-colors hover:bg-muted",
                          pathname === item.href
                            ? "text-primary bg-primary/5"
                            : "text-muted-foreground",
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}

                    <hr className="my-4 border-muted" />

                    {userData ? (
                      <div className="flex flex-col gap-6 mt-2">
                        <Link
                          href="/account"
                          className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted transition-all"
                        >
                          <div className="h-12 w-12 relative overflow-hidden rounded-full border-2 border-background shadow-sm">
                            {userProfileImage ? (
                              <Image
                                src={userProfileImage}
                                alt="User"
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <User2Icon className="h-full w-full p-2 bg-secondary" />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-sm">
                              {userData.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              View Profile
                            </span>
                          </div>
                        </Link>

                        <Button
                          onClick={handleLogout}
                          variant="outline"
                          className="w-full justify-start text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive"
                        >
                          <LogOutIcon className="mr-2 h-4 w-4" /> Logout
                        </Button>
                      </div>
                    ) : (
                      <div className="pt-4">
                        <Link href="/login" className="w-full">
                          <Button className="w-full bg-primary hover:bg-primary/90 shadow-md">
                            Login
                          </Button>
                        </Link>
                      </div>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            ) : (
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
