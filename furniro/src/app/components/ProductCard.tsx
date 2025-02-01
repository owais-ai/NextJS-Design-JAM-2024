"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ProductCardProps {
  _id: string;
  title: string;
  price: number;
  discountPercentage?: number;
  image: string;
  isNew?: boolean;
  onWishlistToggle?: () => void; // ✅ Optional function for wishlist page
}

export default function ProductCard({ _id, title, price, discountPercentage, image, isNew, onWishlistToggle }: ProductCardProps) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);

    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  // ✅ Toggle Wishlist
  const toggleWishlist = () => {
    let updatedWishlist = [...wishlist];

    if (wishlist.includes(_id)) {
      updatedWishlist = wishlist.filter((item) => item !== _id);
      if (onWishlistToggle) onWishlistToggle(); // ✅ Instantly remove from Wishlist Page
    } else {
      updatedWishlist.push(_id);
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  // ✅ Add to Cart
  const addToCart = () => {
    let updatedCart = [...cart];
    const itemIndex = cart.findIndex((item) => item.id === _id);

    if (itemIndex !== -1) {
      updatedCart[itemIndex].quantity += 1;
    } else {
      updatedCart.push({ id: _id, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="relative bg-white rounded-lg shadow-md p-3 hover:scale-105 transition">
      {/* 🏷️ New Badge (Fixed Position) */}
      {isNew && (
        <span className="absolute top-2 left-2 bg-[#B88E2F] text-white px-2 py-1 text-xs font-semibold rounded-md z-10">
          New
        </span>
      )}

      {/* 🖼️ Product Image */}
      <div className="relative w-full h-56 md:h-64">
        <Image src={image} alt={title} layout="fill" className="rounded-md object-cover" />
      </div>

      {/* 📜 Product Details */}
      <div className="text-center mt-3">
        <h3 className="text-base md:text-lg font-semibold text-[#3A3A3A]">{title}</h3>
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

      {/* 🛒 Wishlist & Cart Buttons */}
      <div className="flex justify-between mt-3">
        <button
          className={`border px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm rounded-md font-semibold ${
            wishlist.includes(_id) ? "bg-[#B88E2F] text-white" : "border-[#B88E2F] text-[#B88E2F]"
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
}
