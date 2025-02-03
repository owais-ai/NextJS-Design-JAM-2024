"use client";

import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface ProductCardProps {
  _id: string;
  title: string;
  price: number;
  discountPercentage?: number;
  image: string;
  isNew?: boolean;
  onWishlistToggle?: () => void;
}

const ProductCard: FC<ProductCardProps> = ({
  _id,
  title,
  price,
  discountPercentage,
  image,
  isNew,
  onWishlistToggle,
}) => {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);

  // Initialize state from localStorage when component mounts
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  // Toggle wishlist and dispatch custom event for immediate update
  const toggleWishlist = () => {
    const currentWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    let updatedWishlist = [...currentWishlist];
    if (currentWishlist.includes(_id)) {
      updatedWishlist = currentWishlist.filter((item: string) => item !== _id);
      if (onWishlistToggle) onWishlistToggle();
    } else {
      updatedWishlist.push(_id);
    }
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  // Add to cart, update localStorage, show alert, and dispatch custom event
  const addToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    let updatedCart = [...currentCart];
    const itemIndex = updatedCart.findIndex((item: { id: string }) => item.id === _id);
    if (itemIndex !== -1) {
      updatedCart[itemIndex].quantity += 1;
    } else {
      updatedCart.push({ id: _id, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
    alert(`Added "${title}" to cart!`);
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md p-3 hover:scale-105 transition">
      {isNew && (
        <span className="absolute top-2 left-2 bg-[#B88E2F] text-white px-2 py-1 text-xs font-semibold rounded-md z-10">
          New
        </span>
      )}
      <Link href={`/product/${_id}`}>
        <div className="relative w-full h-56 md:h-64 cursor-pointer">
          <Image src={image} alt={title} fill className="rounded-md object-cover" />
        </div>
      </Link>
      <div className="text-center mt-3">
        <Link href={`/product/${_id}`}>
          <h3 className="text-base md:text-lg font-semibold text-[#3A3A3A] hover:text-[#B88E2F] transition">
            {title}
          </h3>
        </Link>
        <p className="text-[#B0B0B0] text-sm">
          {discountPercentage ? (
            <>
              <span className="text-[#3A3A3A] font-semibold">Rp {price}</span>
              <span className="line-through ml-2 text-xs md:text-sm">
                Rp {(price / (1 - discountPercentage / 100)).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-[#3A3A3A] font-semibold">Rp {price}</span>
          )}
        </p>
      </div>
      <div className="flex justify-between mt-3">
        <button
          className={`border px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-md font-semibold ${
            wishlist.includes(_id)
              ? "bg-[#B88E2F] text-white"
              : "border-[#B88E2F] text-[#B88E2F]"
          }`}
          onClick={toggleWishlist}
        >
          {wishlist.includes(_id) ? "❤️ Remove" : "🤍 Wishlist"}
        </button>
        <button
          className="bg-[#B88E2F] text-white px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-md font-semibold hover:bg-[#9a7729] transition"
          onClick={addToCart}
        >
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
