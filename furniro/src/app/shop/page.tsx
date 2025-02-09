"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { sanityClient } from "@/lib/sanityClient";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

interface Product {
  _id: string;
  title: string;
  price: number;
  discountPercentage?: number;
  imageUrl?: string;
  isNew?: boolean;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState(""); // 🔍 Search State
  const productsPerPage = 8;

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const query = `*[_type == "product"] | order(${sortBy === "priceLow" ? "price asc" : sortBy === "priceHigh" ? "price desc" : "_createdAt desc"
        }) {
        _id,
        title,
        price,
        discountPercentage,
        "imageUrl": image.asset->url,
        isNew
      }`;
      const data = await sanityClient.fetch(query);
      setProducts(data);
      setFilteredProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, [sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  // **Search Functionality (Now Only Searching by Title)**
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
    } else {
      const searchLower = searchQuery.toLowerCase();
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchLower)
      );
      setFilteredProducts(filtered);
      setCurrentPage(1); // Reset to first page when searching
    }
  }, [searchQuery, products]);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-2 items-center justify-center absolute top-36 left-1/2 transform -translate-x-1/2 z-10">
        <h3 className="text-3xl sm:text-4xl tracking-wider font-bold">Shop</h3>
        <p className="flex gap-2 items-center text-sm sm:text-base">
          <Link href="/">Home</Link>
          <Image src="/Vector.svg" alt="Arrow" width={10} height={10} />
          <span>
            <Link href="#">Shop</Link>
          </span>
        </p>
      </div>
      <div className="h-52 relative">
        <Image src="/cover.jpeg" alt="Cover" layout="fill" className="object-cover opacity-40" />
      </div>
      {/* <div className="h-20 relative">
        <Image src="/Group 63.svg" alt="Group" layout="fill" className="object-contain md:object-cover object-center" />
      </div> */}

      {/* Search & Sorting Section */}
      <div className="flex flex-wrap justify-center md:justify-between items-center px-4 md:px-12 mt-6 mb-6">
        <h2 className="text-xl sm:text-3xl  my-4 font-bold text-[#3A3A3A]">Our Products</h2>

        <div className="flex gap-3 items-center">
          {/* Search Bar (Title Only) */}
          <input
            type="text"
            placeholder="Search products by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-[#B88E2F] px-3 py-2 rounded focus:outline-none text-sm sm:text-base w-[150px] sm:w-[250px]"
          />

          {/* Sorting Dropdown */}
          <select
            className="border border-[#B88E2F] px-3 py-2 rounded focus:outline-none text-sm sm:text-base"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Loader while fetching */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Product Listings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4 px-4 md:px-12 mb-8">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
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
                No products found for "{searchQuery}".
              </p>
            )}
          </div>

          {/* Pagination (Now Responsive) */}
          <div className="flex justify-center my-8 gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`text-[#B88E2F] border border-[#B88E2F] py-2 px-3 sm:px-4 rounded font-semibold text-sm sm:text-base ${currentPage === index + 1
                    ? "bg-[#B88E2F] text-white"
                    : "hover:bg-[#b88e2f] hover:text-white transition"
                  }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
