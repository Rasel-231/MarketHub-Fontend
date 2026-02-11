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
import { LogOutIcon, Menu, User2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetMyProfileQuery } from "../Redux/api/userApi/userApi";
import { useUserLogoutMutation } from "../Redux/api/authApi";

const PublicNavbar = () => {
  const pathname = usePathname();

  const { data: response, isLoading } = useGetMyProfileQuery();
  const [logout] = useUserLogoutMutation();
  const userData = response?.data;
  const handleLogout = async () => {
    await logout();
    window.location.href = "/login";
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  // Image path logic (Admin ba Seller thakle tar profilePhoto nibe)
  const userProfileImage =
    userData?.admin?.profilePhoto || userData?.seller?.profilePhoto;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo Section */}
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

        {/* Desktop Navigation */}
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

        {/* Desktop Actions (Login vs Profile) */}
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
                  {/* Profile Image Circle */}
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

              {/* Logout Button */}
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
              <Button className="bg-primary hover:bg-primary/90">Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader className="text-left mb-6">
                <SheetTitle className="flex font-bold text-xl gap-2 items-center">
                  <Image src={BrandImg} alt="Logo" width={24} height={24} />
                  MarketHub
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === item.href
                        ? "text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {item.name}
                  </Link>
                ))}

                <hr className="my-2" />

                {/* Mobile Profile/Login */}
                {userData ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                      <Link href="/account">
                        <div className="h-10 w-10 relative overflow-hidden rounded-full border">
                          {userProfileImage ? (
                            <Image
                              src={userProfileImage}
                              alt="User"
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <User2Icon className="h-10 w-10 p-2" />
                          )}
                        </div>
                        <span className="font-bold">{userData.name}</span>
                      </Link>
                    </div>
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="w-full text-destructive border-destructive hover:bg-destructive/10"
                    >
                      <LogOutIcon className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </div>
                ) : (
                  <Link href="/login">
                    <Button className="w-full bg-primary">Login</Button>
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
