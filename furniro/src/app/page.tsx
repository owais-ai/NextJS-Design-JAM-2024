"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "@/lib/sanityClient";
import ProductCard from "@/app/components/ProductCard";
import LoadingSpinner from "./components/LoadingSpinner";

interface Product {
  _id: string;
  title: string;
  price: number;
  discountPercentage?: number;
  imageUrl?: string;
  isNew?: boolean;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // ✅ Added Loading State

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const query = `*[_type == "product"] | order(_createdAt desc) [0...8] {
          _id,
          title,
          price,
          discountPercentage,
          "imageUrl": image.asset->url,
          isNew
        }`;
        const data = await sanityClient.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false); // ✅ FIXED: Ensure loading state stops after fetching
    }

    fetchProducts();
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div className="hero w-full bg-cover bg-center h-[500px] md:h-[600px] flex items-center relative">
      <Image
        src="/background-hero.jpeg"
        alt="Hero Background"
        layout="fill" // makes the image fill the container
        objectFit="cover" // makes sure it covers the area
        priority // loads it with higher priority
      />
        <div className="w-full max-w-[600px] p-6 bg-[#FFF3E3] rounded-md mx-auto text-center lg:text-left lg:ml-[650px] z-10">
          <p className="text-sm text-gray-700">New Arrival</p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#B88E2F] font-bold my-2">
            Discover Our <br /> New Collection
          </h1>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
          </p>
          <Link href={"/shop"}><button className="bg-[#B88E2F] text-white py-2 px-8 rounded hover:bg-[#9a7729] transition">
            Buy Now
          </button></Link>
        </div>
      </div>

      {/* Browse The Range Section */}
      <section className="mt-16 px-4 lg:px-32 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333333]">Browse The Range</h2>
        

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {[
            { src: "/Mask Group.svg", title: "Dining" },
            { src: "/Image-living room.png", title: "Living" },
            { src: "/Mask Group2.png", title: "Bedroom" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-full max-w-[300px] h-[300px]">
                <Image src={item.src} alt={item.title} layout="fill" className="rounded-md object-cover" />
              </div>
              <p className="text-xl font-semibold text-[#333333] mt-4">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Products Section */}
      <section className="mt-16 px-4 lg:px-10">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-[#3A3A3A]">Our Products</h2>

        {/* ✅ Show loading state while fetching products */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
            {products.length > 0 ? (
              products.slice(0, 8).map((product) => (
                <ProductCard
                  key={product._id}
                  _id={product._id}
                  title={product.title}
                  price={product.price}
                  discountPercentage={product.discountPercentage}
                  image={product.imageUrl || "/placeholder.jpg"}
                  isNew={product.isNew}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 text-lg w-full mt-10">
                No products available at the moment.
              </p>
            )}
          </div>
        )}

        {/* ✅ Show More Button - Links to the full Shop page */}
        <div className="flex justify-center mt-8">
          <Link href="/shop">
            <button className="text-[#B88E2F] border border-[#B88E2F] py-2 px-8 mb-6 rounded font-semibold hover:bg-[#b88e2f] hover:text-white transition">
              Show More
            </button>
          </Link>
        </div>
      </section>

      {/* Explore More Section */}
      <section className="px-4 lg:px-32 py-16 bg-[#FCF8F3] flex flex-col lg:flex-row items-center gap-8">
        <div className="lg:w-1/3">
          <h2 className="text-2xl md:text-3xl font-bold text-[#3A3A3A]">50+ Beautiful rooms inspiration</h2>
          <p className="text-[#616161] mt-4">
            Our designer already made a lot of beautiful prototypes of rooms to inspire you.
          </p>
          <Link href={"/shop"}>
          <button className="bg-[#B88E2F] text-white py-2 px-8 rounded mt-4 hover:bg-[#9a7729] transition">
            Explore More
          </button>
          </Link>
        </div>
        <div className="relative w-full max-w-[380px] h-[380px] lg:w-1/3">
          <Image src="/Image.svg" alt="Room Inspiration" layout="fill" className="rounded-md" />
        </div>
        <div className="lg:w-1/3 flex flex-col items-center gap-4">
          <div className="relative w-[300px] h-[380px]">
            <Image src="/exploreImage.png" alt="Room Detail" layout="fill" className="rounded-md" />
          </div>
          <div className="relative w-[80px] h-[30px]">
            <Image src="/Indicator.svg" alt="Indicator" layout="fill" />
          </div>
        </div>
      </section>

      {/* Setup Section */}
      <div className="setup">
        <div className="text-center leading-8 py-4">
          <p className="text-[#616161] font-semibold">Share your setup with</p>
          <h1 className="text-3xl text-[#3A3A3A] font-bold">#FuniroFurniture</h1>
        </div>
        <div className="w-full">
          <Image src={"/Images-1.png"} alt="Cover pic" width={600} height={600} className="w-full md:-mt-8 mb-4 object-cover object-center rounded-md" />
        </div>
      </div>
    </div>
  );
}
