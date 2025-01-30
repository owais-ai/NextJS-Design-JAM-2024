import Image from "next/image"

export default function Service(){
    return(
        <div className="bg-[#F9F1E7] w-full h-52 mt-16 relative">
        <Image src={'/Feature.svg'}
        alt=""
        layout="fill"
        className="object-contain object-center px-16"
        />
        
    </div>
    )
}