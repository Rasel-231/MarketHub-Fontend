"use client"; // Required for usePathname

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Import hook
import BrandImg from "../../../public/Image/bag-outline.png";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils"; // shadcn helper for conditional classes

const PublicNavbar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
          <div className="relative flex items-center justify-center p-1.5">
            <Image src={BrandImg} alt="MarketHub" height={32} width={32} className="h-7 w-7 object-contain" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">MarketHub</span>
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
                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/register">
            <Button className="bg-primary hover:bg-primary/90">Login</Button>
          </Link>
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
              <SheetHeader className="text-left">
                <SheetTitle className="flex font-bold text-xl gap-2 items-center ">
                  <Image src={BrandImg} alt="Logo" width={24} height={24} />
                  MarketHub
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2 px-4">
                {navItems.map((item) => (
                  <Link 
                    key={item.href} 
                    href={item.href} 
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname === item.href ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                <hr className="my-2" />
                <Link href="/register">
                  <Button className="w-full bg-primary">Login</Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;