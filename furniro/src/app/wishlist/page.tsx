"use client";

import { useEffect, useState } from "react";
import { sanityClient } from "@/lib/sanityClient";
import ProductCard from "../components/ProductCard";

interface Product {
  _id: string;
  title: string;
  price: number;
  discountPercentage?: number;
  imageUrl?: string;
  isNew?: boolean;
}

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (Array.isArray(storedWishlist)) {
      setWishlist(storedWishlist);
      if (storedWishlist.length > 0) {
        fetchWishlistProducts(storedWishlist);
      } else {
        setLoading(false);
      }
    }
  }, []);

  // ✅ Fetch wishlist products properly
  async function fetchWishlistProducts(wishlistIds: string[]) {
    if (!wishlistIds || wishlistIds.length === 0) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const query = `*[_type == "product" && _id in $wishlistIds]{
        _id,
        title,
        price,
        discountPercentage,
        "imageUrl": image.asset->url,
        isNew
      }`;

      const data = await sanityClient.fetch(query, { wishlistIds });

      // ✅ Ensure we correctly update products state
      setProducts(data);
    } catch (error) {
      console.error("Error fetching wishlist products:", error);
    } finally {
      setLoading(false);
    }
  }

  // ✅ Remove item from wishlist instantly & update state
  const removeFromWishlist = (productId: string) => {
    const updatedWishlist = wishlist.filter((id) => id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    // ✅ Remove product from UI immediately
    setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
  };

  return (
    <div className="px-4 md:px-12 mt-10">
      <h2 className="text-center text-2xl md:text-3xl font-bold text-[#3A3A3A] mb-8">
        Your Wishlist
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading wishlist...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              _id={product._id}
              title={product.title}
              price={product.price}
              discountPercentage={product.discountPercentage}
              image={product.imageUrl || "/placeholder.jpg"}
              isNew={product.isNew}
              onWishlistToggle={() => removeFromWishlist(product._id)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">Your wishlist is empty.</p>
      )}
    </div>
  );
}
