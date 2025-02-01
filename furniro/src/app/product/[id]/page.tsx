"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
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
  const params = useParams(); 
  const productId = params.id; // 🔍 Extract product ID properly
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;

    async function fetchProductDetails() {
      setLoading(true);

      try {
        console.log("Fetching product with ID:", productId); // 🛠️ Debugging

        // ✅ Fetch Single Product
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
          console.error("Product not found:", productId);
        } else {
          console.log("Fetched product:", data); // 🛠️ Debugging
          setProduct(data);

          if (data.tags?.length) {
            fetchRelatedProducts(data.tags);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }

      setLoading(false);
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

  if (loading) {
    return <p className="text-center text-gray-500 text-lg w-full mt-10">Loading product details...</p>;
  }

  if (!product) {
    return <p className="text-center text-red-500 text-lg w-full mt-10">❌ No product found.</p>;
  }

  return (
    <div className="px-4 lg:px-32 mt-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 🖼️ Product Image */}
        <div className="relative w-full lg:w-1/2 h-[400px]">
          <Image src={product.imageUrl || "/placeholder.jpg"} alt={product.title} layout="fill" className="rounded-md object-cover" />
          {product.isNew && (
            <span className="absolute top-2 left-2 bg-[#B88E2F] text-white px-3 py-1 text-xs font-semibold rounded">New</span>
          )}
        </div>

        {/* 📜 Product Details */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold text-[#3A3A3A]">{product.title}</h1>
          <p className="text-lg text-[#898989] mt-2">{product.description}</p>

          {/* 💰 Price Section */}
          <div className="mt-4">
            <span className="text-2xl font-bold text-[#3A3A3A]">Rp {product.price}</span>
            {product.discountPercentage && (
              <span className="text-lg text-[#B0B0B0] line-through ml-3">
                Rp {(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>

          {/* 🛒 Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-[#B88E2F] text-white px-6 py-2 rounded font-semibold hover:bg-[#9a7729] transition">
              🛒 Add to Cart
            </button>
            <button className="border border-[#B88E2F] text-[#B88E2F] px-6 py-2 rounded font-semibold hover:bg-[#b88e2f] hover:text-white transition">
              ❤️ Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* 🏷️ Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#3A3A3A] text-center">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
            {relatedProducts.map((product) => (
              <ProductCard
                key={product._id}
                _id={product._id}
                title={product.title}
                price={product.price}
                discountPercentage={product.discountPercentage}
                image={product.imageUrl || "/placeholder.jpg"}
                isNew={product.isNew}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
