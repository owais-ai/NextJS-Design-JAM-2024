import Image from "next/image";
import Service from "../components/Service";

export default function Contact() {
    return (
        <div className="min-h-screen bg-white">
            
            {/* Page Header */}
            <div className="flex flex-col items-center justify-center mt-16 gap-4">
                <h1 className="text-4xl font-bold text-[#333333]">Get In Touch With Us</h1>
                <p className="text-[#9F9F9F] text-center max-w-2xl">
                For More Information About Our Product & Services. Please Feel Free To Drop Us
                An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!
                </p>
            </div>

            {/* Contact Form Section */}
            <div className="flex flex-col lg:flex-row justify-center items-start gap-14 mx-6 lg:mx-24 my-16">
                
                {/* Contact Illustration */}
                <div className="lg:w-1/2 -mt-10">
                    <Image
                        src="/contaactDetails.svg"
                        alt="Contact Illustration"
                        width={350}
                        height={150}
                        className="object-cover"
                    />
                </div>

                {/* Contact Form */}
                <div className="lg:w-1/2 w-full flex flex-col gap-6">
                    
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="text-gray-700 mb-2 font-medium">Your Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Name"
                            className="w-full py-2 px-4 border-2 rounded-md outline-none border-slate-300 focus:border-[#B88E2F]"
                        />
                    </div>

                    {/* Email Address Input */}
                    <div>
                        <label htmlFor="email" className="text-gray-700 mb-2 font-medium">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            className="w-full py-2 px-4 border-2 rounded-md outline-none border-slate-300 focus:border-[#B88E2F]"
                        />
                    </div>

                    {/* Subject Input */}
                    <div>
                        <label htmlFor="subject" className="text-gray-700 mb-2 font-medium">Subject</label>
                        <input
                            id="subject"
                            type="text"
                            placeholder="Subject"
                            className="w-full py-2 px-4 border-2 rounded-md outline-none border-slate-300 focus:border-[#B88E2F]"
                        />
                    </div>

                    {/* Message Textarea */}
                    <div>
                        <label htmlFor="message" className="text-gray-700 mb-2 font-medium">Message</label>
                        <textarea
                            id="message"
                            placeholder="Write your message here..."
                            className="w-full py-4 px-4 border-2 rounded-md outline-none border-slate-300 focus:border-[#B88E2F]"
                            rows = {4}
                        />
                    </div>

                    {/* Submit Button */}
                    <button className="bg-[#B88E2F] text-white font-bold py-3 w-52 rounded-md mt-4 hover:bg-[#a4781e] transition">
                        Submit
                    </button>
                </div>

            </div>

            {/* Service Component */}
            <Service />
        </div>
    );
}
