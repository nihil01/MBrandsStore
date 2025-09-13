import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

const images = [
    "/assets/preview/1.jpeg",
    "/assets/preview/2.jpeg",
    "/assets/preview/3.jpeg",
    "/assets/preview/4.jpeg",
];

export default function PreviewScreen(
    { showPreview }: { showPreview?: (value: boolean) => void }
) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <div className="w-full h-screen relative bg-[#2a1a2e] text-white">
            {/* Slider */}
            <Slider {...settings} className="w-full h-screen">
                {images.map((src, index) => (
                    <div key={index} className="w-full h-screen">
                        <img
                            src={src}
                            alt={`preview-${index}`}
                            className="w-full h-full object-cover brightness-75"
                        />
                    </div>
                ))}
            </Slider>

            {/* Overlay with text and button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-center px-4 h-screen">
                <div className="flex items-center shrink-0 mb-6">
                    <img
                        src="/assets/logo.png"
                        alt="MBrandsStore"
                        className="h-60 w-auto object-contain"
                    />
                </div>

                <motion.h1 initial={{ scale: 0 }} animate={{ scale: 1}} transition={{ duration: 0.4 }}  className="text-[#edadff] text-4xl md:text-6xl font-bold mb-4">
                    Welcome to MBrandsStore
                </motion.h1>

                <motion.p initial={{ scale: 0 }} animate={{ scale: 1}} transition={{ duration: 0.4, delay: 0.5 }} className="text-[#f3d4ff] text-lg md:text-xl mb-6 max-w-2xl">
                    Discover the most stylish and high-quality products, all in one place.
                </motion.p>

                <motion.button
                    initial={{ scale: 0 }} animate={{ scale: 1}} transition={{ duration: 0.4, delay: 0.6 }}
                    className="bg-[#edadff] hover:bg-[#ffb3ff] text-[#2a1a2e] px-8 py-4 rounded-xl text-lg"
                    onClick={() => showPreview ? showPreview(false) : null}
                >
                    Go to Store
                </motion.button>
            </div>
        </div>
    );
}
