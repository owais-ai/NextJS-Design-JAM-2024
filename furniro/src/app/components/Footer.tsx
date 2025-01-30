import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-white border-t-2 border-slate-200">
            <div className="container mx-auto px-4 lg:px-24 py-10">
                <div className="flex flex-wrap justify-between gap-10">
                    {/* Company Info */}
                    <div className="w-full sm:w-[45%] lg:w-[22%] flex flex-col gap-6">
                        <Image src="/logo2.svg" alt="Logo" width={145} height={100} />
                        <p className="text-[#9F9F9F] text-sm">
                            400 University Drive Suite 200 Coral Gables, <br />
                            FL 33134 USA
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className="w-full sm:w-[45%] lg:w-[22%] flex flex-col gap-4">
                        <h3 className="text-[#9F9F9F] font-semibold text-lg">Links</h3>
                        <ul className="flex flex-col gap-4 text-sm font-semibold">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/shop">Shop</Link></li>
                            <li><Link href="/blog">Blog</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Help Section */}
                    <div className="w-full sm:w-[45%] lg:w-[22%] flex flex-col gap-4">
                        <h3 className="text-[#9F9F9F] font-semibold text-lg">Help</h3>
                        <ul className="flex flex-col gap-4 text-sm font-semibold">
                            <li><Link href="#">Payment Options</Link></li>
                            <li><Link href="#">Returns</Link></li>
                            <li><Link href="#">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="w-full sm:w-[45%] lg:w-[22%] flex flex-col gap-4">
                        <h3 className="text-[#9F9F9F] font-semibold text-lg">Newsletter</h3>
                        <div className="flex items-center gap-2">
                            <input
                                type="email"
                                placeholder="Enter Your Email Address"
                                className="flex-1 border-b-2 border-gray-400 focus:border-black outline-none text-sm px-2 py-1"
                            />
                            <button className="text-sm font-semibold border-b-2 border-black text-black hover:text-white hover:bg-black transition py-1 px-4">
                                SUBSCRIBE
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#f9f9f9] py-4">
                <p className="text-center text-sm text-[#9F9F9F]">
                    &copy; 2024 Furino. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
