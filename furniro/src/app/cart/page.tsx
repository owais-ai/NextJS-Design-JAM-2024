"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { sanityClient } from "@/lib/sanityClient";
import Link from "next/link";
import LoadingSpinner from "../components/LoadingSpinner";

interface CartItem {
  id: string;
  quantity: number;
}

interface Product {
  _id: string;
  title: string;
  price: number;
  discountPercentage?: number;
  imageUrl: string;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cart from local storage
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);

    // Fetch product details from Sanity
    async function fetchProducts() {
      if (storedCart.length === 0) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const ids = storedCart.map((item: CartItem) => `"${item.id}"`).join(", ");
      const query = `*[_type == "product" && _id in [${ids}]]{
        _id,
        title,
        price,
        discountPercentage,
        "imageUrl": image.asset->url
      }`;
      const data = await sanityClient.fetch(query);
      setProducts(data);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  // Update cart quantity and dispatch custom event
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return; // Prevent negative quantity

    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  // Remove item from cart and dispatch custom event
  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("localStorageUpdated"));
  };

  // Calculate the grand total price
  const getTotalPrice = () => {
    return cart.reduce((total, cartItem) => {
      const product = products.find((p) => p._id === cartItem.id);
      if (!product) return total;
      return total + cartItem.quantity * product.price;
    }, 0);
  };

  return (
    <div className="px-4 py-6 md:mt-8">
      <h2 className="text-3xl font-bold text-center">🛒 Shopping Cart</h2>

      {loading ? (
        <LoadingSpinner />
      ) : cart.length === 0 ? (
        <p className="text-center text-gray-500 mt-4">
          Your cart is empty.{" "}
          <Link href="/shop" className="text-[#B88E2F]">
            Continue Shopping
          </Link>
        </p>
      ) : (
        <div className="mt-6 max-w-5xl mx-auto">
          {cart.map((cartItem) => {
            const product = products.find((p) => p._id === cartItem.id);
            if (!product) return null;

            return (
              <div
                key={cartItem.id}
                className="flex justify-between items-center border-b py-4"
              >
                {/* Product Image and Details */}
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 relative">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      layout="fill"
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-gray-500">
                      Rp {product.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateQuantity(cartItem.id, cartItem.quantity - 1)
                    }
                    className="px-2 py-1 border rounded text-lg"
                  >
                    -
                  </button>
                  <span className="text-lg">{cartItem.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(cartItem.id, cartItem.quantity + 1)
                    }
                    className="px-2 py-1 border rounded text-lg"
                  >
                    +
                  </button>
                </div>

                {/* Total Price */}
                <p className="font-semibold">
                  Rp {(cartItem.quantity * product.price).toLocaleString()}
                </p>

                {/* Remove Button */}
                <button
                  className="text-red-500 font-semibold"
                  onClick={() => removeFromCart(cartItem.id)}
                >
                  ❌ Remove
                </button>
              </div>
            );
          })}

          {/* Grand Total and Checkout */}
          <div className="text-right mt-6">
            <h3 className="text-xl font-bold">
              Total: Rp {getTotalPrice().toLocaleString()}
            </h3>
            <Link href={"/checkout"}><button className="mt-4 bg-[#B88E2F] text-white px-6 py-3 rounded-md text-lg font-semibold">
              Proceed to Checkout
            </button></Link>
          </div>
        </div>
      )}
    </div>
  );
}
