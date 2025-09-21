import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";


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

    const [images, setImages] = useState<string[]>([]);


    useEffect(() => {
        fetch("/api/v1/products/getRandomProduct")
            .then((res) => res.json())
            .then((data: string[]) => {
                setImages(data);
            })
            .catch((error) => {
                console.error("Error fetching random product images:", error);
                setImages([]);
            });
    }, []);

    return (
        <div className="w-full h-screen relative bg-[#111827] text-white">
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
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-center px-4 h-screen">
                <div className="flex items-center shrink-0 mb-6">
                    <img
                        src="logo.png"
                        alt="MBrandsStore"
                        className="h-60 w-auto object-contain"
                    />
                </div>

                <motion.h1 initial={{ scale: 0 }} animate={{ scale: 1}} transition={{ duration: 0.4 }}  className="text-white text-4xl md:text-6xl font-bold mb-4">
                    Welcome to MBrandsStore
                </motion.h1>

                <motion.p initial={{ scale: 0 }} animate={{ scale: 1}} transition={{ duration: 0.4, delay: 0.5 }} className="text-gray-300 text-lg md:text-xl mb-6 max-w-2xl">
                    Discover the most stylish and high-quality products, all in one place.
                </motion.p>

                <motion.button
                    initial={{ scale: 0 }} animate={{ scale: 1}} transition={{ duration: 0.4, delay: 0.6 }}
                    className="bg-white hover:bg-gray-200 text-gray-900 px-8 py-4 rounded-xl text-lg"
                    onClick={() => showPreview ? showPreview(false) : null}
                >
                    Go to Store
                </motion.button>
            </div>
        </div>
    );
}
