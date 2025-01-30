import Image from "next/image";

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div className="hero bg-[url('/background-hero.jpeg')] w-full bg-cover bg-center h-[500px] md:h-[600px] flex items-center">
        <div className="w-full max-w-[600px] p-6 bg-[#FFF3E3] rounded-md mx-auto text-center lg:text-left lg:ml-[650px]">
          <p className="text-sm text-gray-700">New Arrival</p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-[#B88E2F] font-bold my-2">
            Discover Our <br /> New Collection
          </h1>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
          </p>
          <button className="bg-[#B88E2F] text-white py-2 px-8 rounded hover:bg-[#9a7729] transition">
            Buy Now
          </button>
        </div>
      </div>

      {/* Browse The Range Section */}
      <section className="mt-16 px-4 lg:px-32 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#333333]">Browse The Range</h2>
        <p className="text-[#666666] mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {[
            { src: "/Mask Group.svg", title: "Dining" },
            { src: "/Image-living room.svg", title: "Living" },
            { src: "/Mask Group2.svg", title: "Bedroom" },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-full max-w-[300px] h-[300px]">
                <Image
                  src={item.src}
                  alt={item.title}
                  layout="fill"
                  className="rounded-md object-cover"
                />
              </div>
              <p className="text-xl font-semibold text-[#333333] mt-4">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Products Section */}
      <section className="mt-16 px-4 lg:px-32">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-[#3A3A3A]">Our Products</h2>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {[
            {
              src: "/43eebd52ea72d60650f31030ec4bf7e6.png", title: "Syltherine", price: "Rp 2.500.000", discount: "Rp 3.500.000", description: "Stylish cafe chair"

            },
            {
              src: "/4a5dbc0c29efbae1beca6ab40dd9b598.jpeg", title: "Respira", price: "Rp 2.500.000", discount: "Rp 500.000", description: "Outdoor bar table and stool"

            },
            {
              src: "/7c62fb49f7d4a1a6a5dc5959b40150ed.png", title: "Lolito", price: "Rp 2.500.000", discount: "Rp 3.500.000", description: "Luxury big sofa"

            },
            {
              src: "/a7c05024ab4e27374edb12195b6559e2.png", title: "Muggo", price: "Rp 2.500.000", discount: "Rp 500.000", description: "Small Mug"

            },
            {
              src: "/43eebd52ea72d60650f31030ec4bf7e6.png", title: "Syltherine", price: "Rp 2.500.000", discount: "Rp 3.500.000", description: "Stylish cafe chair"
            },
            {
              src: "/ea43a4c55f9e28aa3592f17ff47a4303.png", title: "Respira", price: "Rp 2.500.000", discount: "Rp 500.000", description: "Outdoor bar table and stool"

            },
            {
              src: "/3d98b27fb98ee49958d7089f10d39dfe.jpeg", title: "Pot", price: "Rp 2.500.000", discount: "Rp 3.500.000", description: "Minimalist flower pot"

            },
            { src: "/e77ede2f478b2f26210bd264978981f6.jpeg", title: "Pingky", price: "Rp 2.500.000", discount: "Rp 500.000", description: "Cute bed set" },
           
          ].map((product, index) => (
            <div key={index} className="w-full sm:w-[45%] hover:scale-105 lg:w-[22%] text-center">
              <div className="relative w-full h-[350px]">
                <Image
                  src={product.src}
                  alt={product.title}
                  layout="fill"
                  className="rounded-t object-cover"
                />
              </div>
              <div className="bg-[#F4F5F7] rounded-b">
              <h3 className="text-xl font-semibold text-[#3A3A3A]">{product.title}</h3>
              <p className="text-[#898989]">{product.description}</p>
              <p className="text-lg font-semibold">
                <span className="text-[#3A3A3A]">{product.price}</span>{" "}
                <span className="line-through text-[#B0B0B0]">{product.discount}</span>
              </p></div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button className="text-[#B88E2F] border border-[#B88E2F] py-2 px-8 mb-6 rounded font-semibold hover:bg-[#b88e2f] hover:text-white transition">
            Show More
          </button>
        </div>
      </section>

      {/* Explore More Section */}
      <section className="px-4 lg:px-32 py-16 bg-[#FCF8F3] flex flex-col lg:flex-row items-center gap-8">
        <div className="lg:w-1/3">
          <h2 className="text-2xl md:text-3xl font-bold text-[#3A3A3A]">50+ Beautiful rooms inspiration</h2>
          <p className="text-[#616161] mt-4">
            Our designer already made a lot of beautiful prototypes of rooms to inspire you.
          </p>
          <button className="bg-[#B88E2F] text-white py-2 px-8 rounded mt-4 hover:bg-[#9a7729] transition">
            Explore More
          </button>
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
      <div className="setup">

        <div className="text-center leading-8 py-4">
          <p className="text-[#616161] font-semibold">Share your setup with</p>
          <h1 className="text-3xl text-[#3A3A3A] font-bold">#FuniroFurniture</h1>
        </div>

        <div className="w-full">
          <Image src={'/Images.svg'} alt="" width={130} height={30} className="w-full -mt-8 mb-4 object-cover object-center rounded-md"></Image>
        </div>

      </div>
    </div>
  );
}
