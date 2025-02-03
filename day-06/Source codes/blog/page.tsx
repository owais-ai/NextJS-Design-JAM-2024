import Image from "next/image";
import Link from "next/link";
import Service from "../components/Service";

export default function Blog() {
    return (
        <div className="">
            {/* Header Section */}
            <div className="flex flex-col gap-2 items-center justify-center absolute top-36 z-10 left-1/2 transform -translate-x-1/2">
                <h3 className="text-4xl tracking-wider font-bold">Blog</h3>
                <p className="flex gap-2">
                    <Link href={"/"}>Home</Link>
                    <Image src={"/Vector.svg"} alt="Arrow" width={10} height={10} />
                    <span><Link href={"#"}>Blog</Link></span>
                </p>
            </div>
            <div className="h-52 relative">
                <Image
                    src={"/cover.jpeg"}
                    alt="Cover"
                    layout="fill"
                    className="object-cover object-center opacity-40"
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col lg:flex-row justify-around mx-6 lg:mx-24 my-16 gap-10">
                {/* Main Content */}
                <div className="lg:w-2/3">
                    {/* First Blog Post */}
                    <div className="relative w-full lg:w-[600px] aspect-video mt-16">
                        <Image
                            src={"/41417cd682c30a19eecaf20a549cee89.jpeg"}
                            alt="Millennial Design"
                            layout="fill"
                            className="object-cover object-center rounded-md"
                        /></div>
                    <div className="my-6">
                        <Image src={"/Group 172.svg"} alt="Icon" width={300} height={50} />
                    </div>
                    <h3 className="text-3xl">Exploring new ways of decorating</h3>
                    <p className="text-[#9F9F9F] py-4 text-justify lg:w-[600px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum....
                    </p>
                    <button className="border-b-2 border-slate-400">Read More</button>

                    {/* Second Blog Post */}
                    <div className="relative w-full lg:w-[600px] aspect-video mt-16">
                        <Image
                            src={"/writing.jpeg"}
                            alt="Exploring new ways of decorating"
                            layout="fill"
                            className="object-cover object-center rounded-md"
                        />
                    </div>
                    <div className="my-6">
                        <Image src={"/Group 172.svg"} alt="Icon" width={300} height={50} />
                    </div>
                    <h3 className="text-3xl">Exploring new ways of decorating</h3>
                    <p className="text-[#9F9F9F] py-4 text-justify lg:w-[600px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum....
                    </p>
                    <button className="border-b-2 border-slate-400">Read More</button>

                    {/* Third Blog Post */}
                    <div className="relative w-full lg:w-[600px] aspect-video mt-16">
                        <Image
                            src={"/4190307dc6c7273c0bbf5086605997e4.jpeg"}
                            alt="Handmade pieces"
                            layout="fill"
                            className="object-cover object-center rounded-md"
                        />
                    </div>
                    <div className="my-6">
                        <Image src={"/Group 172.svg"} alt="Icon" width={300} height={50} />
                    </div>
                    <h3 className="text-3xl">Handmade pieces that took time to make</h3>
                    <p className="text-[#9F9F9F] py-4 text-justify lg:w-[600px]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer malesuada nunc. In nulla posuere sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit libero. Pellentesque elit ullamcorper dignissim cras tincidunt. Pharetra et ultrices neque ornare aenean euismod elementum....
                    </p>
                    <button className="border-b-2 border-slate-400">Read More</button>
                </div>

                {/* Sidebar */}
                <div className="lg:w-1/3">
                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border-2 border-slate-300 outline-none rounded-md py-2 pl-5 pr-10 w-full"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center">
                            <button>
                                <Image
                                    src="/akar-icons_search.svg"
                                    alt="Search Icon"
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Categories */}
                    <div>
                        <h2 className="text-2xl font-semibold mt-10 mb-6">Categories</h2>
                        <div className="flex justify-between">
                            <ul className="text-[#9F9F9F]">
                                <li className="py-3">Crafts</li>
                                <li className="py-3">Design</li>
                                <li className="py-3">Handmade</li>
                                <li className="py-3">Interior</li>
                                <li className="py-3">Wood</li>
                            </ul>
                            <ul className="text-[#9F9F9F]">
                                <li className="py-3">2</li>
                                <li className="py-3">8</li>
                                <li className="py-3">7</li>
                                <li className="py-3">1</li>
                                <li className="py-3">6</li>
                            </ul>
                        </div>
                    </div>
                    {/* Recent Posts */}
                    <div className="mt-16">
                        <h3 className="text-2xl font-semibold mb-4">Recent Posts</h3>
                        {[{
                            img: '/8b94b8e3a17bbb18c564006d557e73b1.jpeg',
                            title: 'Going all-in with millennial design',
                            date: '03 Aug 2022',
                        },
                        {
                            img: '/309ac985861a262b8622e7528e08049f.jpeg',
                            title: 'Exploring new ways of decorating',
                            date: '03 Aug 2022',

                        },
                        {
                            img: '/6615f4968338e0a7004a86529ecf85c9.jpeg',
                            title: 'Handmade pieces that took time to make',
                            date: '03 Aug 2022',
                        },
                        {
                            img: '/cfbc72a9932875eeb20db551bb01abb3.jpeg',
                            title: 'Modern home in Milan',
                            date: '03 Aug 2022',

                        },
                        {
                            img: '/7de5c930d1538360f43cbfa1d7f00337.jpeg',
                            title: 'Colorful office redesign',
                            date: '03 Aug 2022',

                        }].map((post, idx) => (
                            <div key={idx} className="flex gap-4 items-center mb-4">
                                <div className="relative w-[80px] h-[80px]">
                                    <Image src={post.img} alt={post.title} layout="fill" className="object-cover rounded-md" />
                                </div>
                                <div>
                                    <p className="text-sm">{post.title}</p>
                                    <p className="text-gray-400 text-xs">{post.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex gap-4 my-10 justify-center">
                <button className="py-3 px-5 bg-[#B88E2F] text-white rounded-md">1</button>
                <button className="py-3 px-5 bg-[#F9F1E7] text-black rounded-md">2</button>
                <button className="py-3 px-5 bg-[#F9F1E7] text-black rounded-md">3</button>
                <button className="py-3 px-5 bg-[#F9F1E7] text-black rounded-md">Next</button>
            </div>

            {/* Service Component */}
            <Service />
        </div>
    );
}
