"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { sanityClient } from "@/lib/sanityClient";
import ProductCard from "@/app/components/ProductCard";

interface Product {
  _id: string;
  title: string;
  price: number;
  discountPercentage?: number;
  imageUrl?: string;
  isNew?: boolean;
  description: string;
  tags?: string[];
}

export default function ProductDetailPage() {
  const { id: productId } = useParams(); // Extract ID from URL
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState<number>(1); // State for quantity
  const [loading, setLoading] = useState(true);

  // Local state for wishlist & cart
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);

  // 1. Fetch Product + Related Data
  useEffect(() => {
    if (!productId) return;

    // Load local storage data
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(Array.isArray(storedWishlist) ? storedWishlist : []);

    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(Array.isArray(storedCart) ? storedCart : []);

    async function fetchProductDetails() {
      setLoading(true);
      try {
        // Fetch single product details from Sanity
        const query = `*[_type == "product" && _id == $id][0]{
          _id,
          title,
          price,
          discountPercentage,
          "imageUrl": image.asset->url,
          isNew,
          description,
          tags
        }`;
        const data = await sanityClient.fetch(query, { id: productId });
        if (!data) {
          console.warn("Product not found:", productId);
          setProduct(null);
        } else {
          setProduct(data);
          if (data.tags?.length) {
            fetchRelatedProducts(data.tags);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchRelatedProducts(tags: string[]) {
      const query = `*[_type == "product" && tags match "${tags.join(",")}" && _id != $id][0...4]{
        _id,
        title,
        price,
        discountPercentage,
        "imageUrl": image.asset->url,
        isNew
      }`;
      const relatedData = await sanityClient.fetch(query, { id: productId });
      setRelatedProducts(relatedData);
    }

    fetchProductDetails();
  }, [productId]);

  // 2. Quantity Handlers
  function handleIncrement() {
    setQuantity((prev) => prev + 1);
  }

  function handleDecrement() {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  }

  // 3. Add to Cart (with custom event dispatch)
  function handleAddToCart() {
    if (!product) return;

    const updatedCart = [...cart];
    const itemIndex = updatedCart.findIndex((item) => item.id === product._id);

    if (itemIndex !== -1) {
      // Already in cart: increment quantity
      updatedCart[itemIndex].quantity += quantity;
    } else {
      // Add new item
      updatedCart.push({ id: product._id, quantity });
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`Added ${quantity} x "${product.title}" to cart!`);
    // Dispatch custom event to update header counts immediately
    window.dispatchEvent(new Event("localStorageUpdated"));
  }

  // 4. Toggle Wishlist (with custom event dispatch)
  function handleToggleWishlist() {
    if (!product) return;

    let updatedWishlist = [...wishlist];
    if (updatedWishlist.includes(product._id)) {
      // Remove from wishlist
      updatedWishlist = updatedWishlist.filter((pid) => pid !== product._id);
      alert(`Removed "${product.title}" from wishlist!`);
    } else {
      // Add to wishlist
      updatedWishlist.push(product._id);
      alert(`Added "${product.title}" to wishlist!`);
    }
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    // Dispatch custom event to update header counts immediately
    window.dispatchEvent(new Event("localStorageUpdated"));
  }

  // 5. Render States
  if (loading) {
    return (
      <p className="text-center text-gray-500 text-lg w-full mt-10">
        Loading product details...
      </p>
    );
  }

  if (!product) {
    return (
      <p className="text-center text-red-500 text-lg w-full mt-10">
        ❌ No product found.
      </p>
    );
  }

  const isOnWishlist = wishlist.includes(product._id);

  return (
    <div className="px-4 lg:px-32 mt-10">
      {/* ---------- Top Section: Image + Basic Info + Price ---------- */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="relative w-full md:w-1/2 h-[400px]">
          <Image
            src={product.imageUrl || "/placeholder.jpg"}
            alt={product.title}
            fill
            className="rounded-md object-cover"
          />
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-[#B88E2F] text-white px-3 py-1 text-xs font-semibold rounded">
              New
            </span>
          )}
        </div>

        {/* Product Info & Actions */}
        <div className="md:w-1/2 flex flex-col justify-between">
          {/* Title & Pricing */}
          <div>
            <h1 className="text-3xl font-bold text-[#3A3A3A]">
              {product.title}
            </h1>
            <div className="mt-3">
              <span className="text-2xl font-bold text-[#3A3A3A]">
                Rp {product.price}
              </span>
              {product.discountPercentage && (
                <span className="text-lg text-[#B0B0B0] line-through ml-3">
                  Rp {(
                    product.price / (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Quantity Selector and Buttons */}
          <div className="mt-6">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={handleDecrement}
                className="border border-gray-300 px-3 py-1 rounded text-xl font-bold"
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="border border-gray-300 px-3 py-1 rounded text-xl font-bold"
              >
                +
              </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="bg-[#B88E2F] text-white px-6 py-2 rounded font-semibold hover:bg-[#9a7729] transition"
              >
                🛒 Add to Cart
              </button>
              <button
                onClick={handleToggleWishlist}
                className={`border px-6 py-2 rounded font-semibold transition ${
                  isOnWishlist
                    ? "bg-[#B88E2F] text-white hover:bg-[#9a7729]"
                    : "border-[#B88E2F] text-[#B88E2F] hover:bg-[#b88e2f] hover:text-white"
                }`}
              >
                {isOnWishlist ? "❤️ In Wishlist" : "🤍 Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Product Description ---------- */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2 text-[#3A3A3A]">
          Product Description
        </h2>
        <p className="text-[#898989] leading-relaxed">{product.description}</p>
      </div>

      {/* ---------- Related Products Section ---------- */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#3A3A3A] text-center">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
            {relatedProducts.map((rp) => (
              <ProductCard
                key={rp._id}
                _id={rp._id}
                title={rp.title}
                price={rp.price}
                discountPercentage={rp.discountPercentage}
                image={rp.imageUrl || "/placeholder.jpg"}
                isNew={rp.isNew}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
