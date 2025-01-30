import Image from "next/image";
import Link from "next/link";
import Service from "../components/Service";

const products = [
  {
    id: 1,
    image: "/43eebd52ea72d60650f31030ec4bf7e6.png",
    name: "Syltherine",
    description: "Stylish cafe chair",
    price: "Rp 2.500.000",
    oldPrice: "Rp 3.500.000",
  },
  {
    id: 2,
    image: "/4a5dbc0c29efbae1beca6ab40dd9b598.jpeg",
    name: "Syltherine",
    description: "Outdoor bar table and stool",
    price: "Rp 2.500.000",
    oldPrice: "Rp 500.000",
  },
  {
    id: 3,
    image: "/7c62fb49f7d4a1a6a5dc5959b40150ed.png",
    name: "Lolito",
    description: "Luxury big sofa",
    price: "Rp 500.000",
    oldPrice: "Rp 800.000",
  },
  {
    id: 4,
    image: "/a7c05024ab4e27374edb12195b6559e2.png",
    name: "Muggo",
    description: "Small Mug",
    price: "Rp 4.500.000",
    oldPrice: "Rp 7.500.000",
  },
  {
    id: 5,
    image: "/43eebd52ea72d60650f31030ec4bf7e6.png",
    name: "Syltherine",
    description: "Stylish cafe chair",
    price: "Rp 2.500.000",
    oldPrice: "Rp 3.500.000",
  },
  {
    id: 6,
    image: "/4a5dbc0c29efbae1beca6ab40dd9b598.jpeg",
    name: "Syltherine",
    description: "Outdoor bar table and stool",
    price: "Rp 2.500.000",
    oldPrice: "Rp 500.000",
  },
  {
    id: 7,
    image: "/7c62fb49f7d4a1a6a5dc5959b40150ed.png",
    name: "Lolito",
    description: "Luxury big sofa",
    price: "Rp 500.000",
    oldPrice: "Rp 800.000",
  },
  {
    id: 8,
    image: "/a7c05024ab4e27374edb12195b6559e2.png",
    name: "Muggo",
    description: "Small Mug",
    price: "Rp 4.500.000",
    oldPrice: "Rp 7.500.000",
  },
  {
    id: 9,
    image: "/43eebd52ea72d60650f31030ec4bf7e6.png",
    name: "Syltherine",
    description: "Stylish cafe chair",
    price: "Rp 2.500.000",
    oldPrice: "Rp 3.500.000",
  },
  {
    id: 10,
    image: "/4a5dbc0c29efbae1beca6ab40dd9b598.jpeg",
    name: "Syltherine",
    description: "Outdoor bar table and stool",
    price: "Rp 2.500.000",
    oldPrice: "Rp 500.000",
  },
  {
    id: 11,
    image: "/7c62fb49f7d4a1a6a5dc5959b40150ed.png",
    name: "Lolito",
    description: "Luxury big sofa",
    price: "Rp 500.000",
    oldPrice: "Rp 800.000",
  },
  {
    id: 12,
    image: "/a7c05024ab4e27374edb12195b6559e2.png",
    name: "Muggo",
    description: "Small Mug",
    price: "Rp 4.500.000",
    oldPrice: "Rp 7.500.000",
  },
  {
    id: 13,
    image: "/43eebd52ea72d60650f31030ec4bf7e6.png",
    name: "Syltherine",
    description: "Stylish cafe chair",
    price: "Rp 2.500.000",
    oldPrice: "Rp 3.500.000",
  },
  {
    id: 14,
    image: "/4a5dbc0c29efbae1beca6ab40dd9b598.jpeg",
    name: "Syltherine",
    description: "Outdoor bar table and stool",
    price: "Rp 2.500.000",
    oldPrice: "Rp 500.000",
  },
  {
    id: 15,
    image: "/7c62fb49f7d4a1a6a5dc5959b40150ed.png",
    name: "Lolito",
    description: "Luxury big sofa",
    price: "Rp 500.000",
    oldPrice: "Rp 800.000",
  },
  {
    id: 16,
    image: "/a7c05024ab4e27374edb12195b6559e2.png",
    name: "Muggo",
    description: "Small Mug",
    price: "Rp 4.500.000",
    oldPrice: "Rp 6.500.000",
  },
];

export default function Shop() {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col gap-2 items-center justify-center absolute top-36 z-10 left-[46%]">
        <h3 className="text-4xl tracking-wider font-bold">Shop</h3>
        <p className="flex gap-2">
          <Link href="/">Home</Link>
          <Image src="/Vector.svg" alt="Arrow" width={10} height={10} />
          <span>
            <Link href="#">Shop</Link>
          </span>
        </p>
      </div>
      <div className="h-52 relative">
        <Image src="/cover.jpeg" alt="Cover" layout="fill" className="object-cover object-center opacity-40" />
      </div>
      <div className="h-20 relative">
        <Image src="/Group 63.svg" alt="Group" layout="fill" className="object-cover object-center" />
      </div>

      {/* Products Section */}
      <div className="Products flex justify-around mt-10 mx-24 flex-wrap">
        {products.map((product) => (
          <div key={product.id} className="product hover:scale-105 w-60 h-96">
            <div className="relative w-60 h-64">
              <Image src={product.image} alt={product.name} layout="fill" className="object-cover object-center rounded-t" />
            </div>
            <div className="flex flex-col pt-2 rounded-b text-center mb-16 items-center bg-[#F4F5F7]">
              <h3 className="text-2xl text-[#3A3A3A]">{product.name}</h3>
              <p className="text-[#898989]">{product.description}</p>
              <h4 className="flex gap-3">
                <span className="text-[#3A3A3A]">{product.price}</span>
                <span className="text-[#B0B0B0]">
                  <s>{product.oldPrice}</s>
                </span>
              </h4>
            </div>
          </div>
        ))}
      </div>
      <Service />
    </div>
  );
}
