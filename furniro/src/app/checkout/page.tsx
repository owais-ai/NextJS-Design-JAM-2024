"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { sanityClient } from "@/lib/sanityClient";
import LoadingSpinner from "../components/LoadingSpinner";


interface CartItem {
  id: string;
  quantity: number;
}

interface Product {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState("");

  // Shipping details states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateField, setStateField] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  // Payment details states
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Calculate total price based on fetched product details and cart quantities
  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const product = products.find((p) => p._id === item.id);
      if (!product) return total;
      return total + product.price * item.quantity;
    }, 0);
  };

  // Load cart from localStorage and then fetch product details dynamically from Sanity
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);

    async function fetchProducts() {
      if (storedCart.length === 0) {
        setLoading(false);
        return;
      }
      // Build a comma-separated string of IDs
      const ids = storedCart.map((item: CartItem) => `"${item.id}"`).join(", ");
      const query = `*[_type == "product" && _id in [${ids}]]{
        _id,
        title,
        price,
        "imageUrl": image.asset->url
      }`;
      try {
        const data = await sanityClient.fetch(query);
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch product details.");
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  // Handle order submission
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation: Check that all required fields are filled
    if (
      !fullName ||
      !email ||
      !address ||
      !city ||
      !stateField ||
      !postalCode ||
      !country ||
      !cardNumber ||
      !expiry ||
      !cvv
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Simulate placing an order. In a real app, you'd send these details to your backend.
    const orderDetails = {
      fullName,
      email,
      address,
      city,
      state: stateField,
      postalCode,
      country,
      cardNumber,
      expiry,
      cvv,
      cart,
      total: getTotalPrice(),
    };
    console.log("Placing order with details:", orderDetails);

    // Clear the cart from localStorage to simulate order placement
    localStorage.removeItem("cart");
    setCart([]);
    // Dispatch custom event so Header updates immediately
    window.dispatchEvent(new Event("localStorageUpdated"));
    setOrderPlaced(true);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-2 px-4">
        <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg text-center">
          {/* Hero Image or Icon */}
          <div className="mb-6">
            <Image
              src="/order-confirmation.png"
              alt="Order Confirmed"
              width={150}
              height={150}
              className="mx-auto"
            />
          </div>
          {/* Confirmation Message */}
          <h1 className="text-3xl font-bold text-[#3A3A3A] mb-4">
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Thank you for your purchase. Your order has been confirmed and will be delivered within a week.
          </p>
          {/* Continue Shopping Button */}
          <Link href="/shop">
            <button className="bg-[#B88E2F] text-white py-2 px-6 rounded-md font-semibold hover:bg-[#9a7729] transition">
              Continue Shopping
            </button>
          </Link>
        </div>
        {/* Additional Information */}
        <div className="mt-10 text-center">
          <p className="text-gray-600">
            If you have any questions or need assistance, please don't hesitate to contact our support team.
          </p>
          <Link href="/contact" className="text-[#B88E2F] underline">
            Contact Support
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 mt-2 md:mt-8 mb-10">
      <h2 className="text-3xl font-bold text-center mb-6">Checkout</h2>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handlePlaceOrder} className="space-y-6">
        {/* Shipping Details */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Shipping Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="border p-2 rounded w-full"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-2 rounded w-full md:col-span-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="City"
              className="border p-2 rounded w-full"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="State"
              className="border p-2 rounded w-full"
              value={stateField}
              onChange={(e) => setStateField(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="border p-2 rounded w-full"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Country"
              className="border p-2 rounded w-full"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Payment Details */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Payment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Card Number"
              className="border p-2 rounded w-full"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Expiry Date (MM/YY)"
              className="border p-2 rounded w-full"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="CVV"
              className="border p-2 rounded w-full md:col-span-2"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
          <div className="border p-4 rounded space-y-2">
            {cart.map((item) => {
              const product = products.find((p) => p._id === item.id);
              if (!product) return null;
              return (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative w-10 h-10">
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="rounded object-cover"
                      />
                    </div>
                    <span>
                      {product.title} (x{item.quantity})
                    </span>
                  </div>
                  <span>Rp {(product.price * item.quantity).toLocaleString()}</span>
                </div>
              );
            })}
            <div className="flex justify-between font-bold border-t pt-2 mt-2">
              <span>Total:</span>
              <span>Rp {getTotalPrice().toLocaleString()}</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#B88E2F] text-white py-3 rounded font-semibold hover:bg-[#9a7729] transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
