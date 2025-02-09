"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'




export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Update cart and wishlist counts by reading localStorage
  const updateCounts = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    const totalCartCount = Array.isArray(storedCart)
      ? storedCart.reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0)
      : 0;
    setCartCount(totalCartCount);

    const totalWishlistCount = Array.isArray(storedWishlist) ? storedWishlist.length : 0;
    setWishlistCount(totalWishlistCount);
  };

  useEffect(() => {
    updateCounts();
    // Listen for our custom event for immediate updates
    window.addEventListener("localStorageUpdated", updateCounts);
    return () => window.removeEventListener("localStorageUpdated", updateCounts);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <ClerkProvider>
        <div className="flex flex-wrap items-center justify-center md:justify-between py-5 px-5 md:px-10 lg:px-24">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href={"/"}>
              <Image
                src={"/logo2.svg"}
                alt="Logo"
                width={185}
                height={100}
                className="w-28 md:w-44"
              />
            </Link>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex gap-10 font-semibold">
            <Link href={"/"} className="border-b-2 border-transparent hover:border-slate-200">
              Home
            </Link>
            <Link href={"/shop"} className="hover:border-b-2 hover:border-slate-200">
              Shop
            </Link>
            <Link href={"/blog"} className="hover:border-b-2 hover:border-slate-200">
              Blog
            </Link>
            <Link href={"/contact"} className="hover:border-b-2 hover:border-slate-200">
              Contact
            </Link>
          </nav>

          {/* Icon Buttons (Desktop) - Removed Search Button */}
          <div className="hidden md:flex gap-4 mt-4 md:mt-0 relative">
            <button>

              <SignedOut>
                <SignInButton>
                  <Image
                    src={"/mdi_account-alert-outline.svg"}
                    alt="Account Alert"
                    width={30}
                    height={25}
                  />
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>

            </button>

            <button>
              <Link href={"/wishlist"}>
                <div className="relative">
                  <Image
                    src={"/akar-icons_heart.svg"}
                    alt="Wishlist"
                    width={25}
                    height={25}
                  />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </div>
              </Link>
            </button>
            <button>
              <Link href={"/cart"}>
                <div className="relative">
                  <Image
                    src={"/ant-design_shopping-cart-outlined.svg"}
                    alt="Cart"
                    width={25}
                    height={25}
                  />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
              </Link>
            </button>
          </div>

          {/* Mobile Navigation Sheet */}
          <div className="md:hidden relative left-24 top-1">
            <Sheet>
              <SheetTrigger>
                <Menu />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Navigate to?</SheetTitle>
                  <SheetDescription>
                    <div className="mt-10">
                      <ul className="flex flex-col items-center gap-6 font-semibold">
                        <li>
                          <Link
                            href={"/"}
                            className="border-b-2 border-transparent text-xl w-full text-center hover:border-slate-200"
                          >
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={"/shop"}
                            className="border-b-2 border-transparent text-xl w-full text-center hover:border-slate-200"
                          >
                            Shop
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={"/blog"}
                            className="border-b-2 border-transparent text-xl w-full text-center hover:border-slate-200"
                          >
                            Blog
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={"/contact"}
                            className="border-b-2 border-transparent text-xl w-full text-center hover:border-slate-200"
                          >
                            Contact
                          </Link>
                        </li>
                        {/* Wishlist Link with Badge */}
                        <li>
                          <Link
                            href={"/wishlist"}
                            className="border-b-2 border-transparent text-xl w-full text-center hover:border-slate-200"
                          >
                            <div className="flex flex-col items-center">
                              <div className="relative">
                                <Image
                                  src={"/akar-icons_heart.svg"}
                                  alt="Wishlist"
                                  width={20}
                                  height={20}
                                />
                                {wishlistCount > 0 && (
                                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {wishlistCount}
                                  </span>
                                )}
                              </div>
                              <span>Wishlist</span>
                            </div>
                          </Link>
                        </li>
                        {/* Cart Link with Badge */}
                        <li>
                          <Link
                            href={"/cart"}
                            className="border-b-2 border-transparent text-xl w-full text-center hover:border-slate-200"
                          >
                            <div className="flex flex-col items-center">
                              <div className="relative">
                                <Image
                                  src={"/ant-design_shopping-cart-outlined.svg"}
                                  alt="Cart"
                                  width={20}
                                  height={20}
                                />
                                {cartCount > 0 && (
                                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartCount}
                                  </span>
                                )}
                              </div>
                              <span>Cart</span>
                            </div>
                          </Link>
                        </li>

                        <li>
                          <div className="text-xl w-full text-center">
                            <div>
                              <button>
                                <div className="flex flex-col items-center">
                                  <SignedOut>
                                    <SignInButton>
                                      <Image
                                        src={"/mdi_account-alert-outline.svg"}
                                        alt="Account Alert"
                                        width={30}
                                        height={25}
                                      />

                                    </SignInButton>
                                  </SignedOut>
                                  <SignedIn>
                                    <UserButton />
                                  </SignedIn>
                                  <span>Account</span>
                                </div>
                              </button>

                            </div>
                          </div>
                        </li>

                      </ul>
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </ClerkProvider>
    </header>
  );
}
