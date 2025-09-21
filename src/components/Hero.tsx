import { ArrowRight, Play, Star, Users, Package, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageContext";
import { motion } from "framer-motion";

interface HeroProps {
    onShopNowClick?: () => void;
}

const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: custom * 0.2,
            duration: 0.8,
            ease: "easeOut",
        },
    }),
};

const floatingVariants = {
    floating: {
        y: [-10, 10, -10],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
        },
    },
};

export default function Hero({ onShopNowClick }: HeroProps) {
    const { t } = useLanguage();

    const handleShopNow = () => {
        onShopNowClick?.();
        const productsSection = document.getElementById('products-section');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const stats = [
        { icon: Users, number: "10K+", label: "Happy Customers" },
        { icon: Package, number: "100+", label: "Products" },
        { icon: Award, number: "30+", label: "Brands" },
    ];

    const brands = ["Nike", "Adidas", "Zara", "H&M", "Uniqlo", "Levi's"];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100">
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 bg-grid-gray-100/25 bg-[size:60px_60px] opacity-30"></div>

            {/* Animated Background Circles */}
            <motion.div
                variants={floatingVariants}
                animate="floating"
                className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-gray-200/40 to-gray-300/40 rounded-full blur-2xl"
            />
            <motion.div
                variants={floatingVariants}
                animate="floating"
                style={{ animationDelay: "2s" }}
                className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-l from-gray-300/30 to-gray-200/30 rounded-full blur-3xl"
            />
            <motion.div
                variants={floatingVariants}
                animate="floating"
                style={{ animationDelay: "4s" }}
                className="absolute top-1/2 left-1/4 w-24 h-24 bg-gray-400/20 rounded-full blur-xl"
            />

            {/* Floating Product Images */}
            <motion.div
                variants={floatingVariants}
                animate="floating"
                className="absolute top-1/4 left-20 hidden lg:block"
            >
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-200">
                    <span className="text-2xl">🧥</span> {/* куртка */}
                </div>
            </motion.div>

            <motion.div
                variants={floatingVariants}
                animate="floating"
                className="absolute top-1/5 right-10 hidden lg:block"
            >
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-200">
                    <span className="text-2xl">👒</span> {/* шляпа */}
                </div>
            </motion.div>

            <motion.div
                variants={floatingVariants}
                animate="floating"
                className="absolute top-1/3 right-40 hidden lg:block"
            >
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-200">
                    <span className="text-2xl">👗</span> {/* платье */}
                </div>
            </motion.div>

            <motion.div
                variants={floatingVariants}
                animate="floating"
                className="absolute top-1/5 left-10 hidden lg:block"
            >
                <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-gray-200">
                    <span className="text-2xl">🧢</span> {/* кепка */}
                </div>
            </motion.div>

            <motion.div
                variants={floatingVariants}
                animate="floating"
                style={{ animationDelay: "1s" }}
                className="absolute bottom-1/3 left-16 hidden lg:block"
            >
                <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center border border-gray-200">
                    <span className="text-xl">👠</span> {/* туфли */}
                </div>
            </motion.div>

            <motion.div
                variants={floatingVariants}
                animate="floating"
                style={{ animationDelay: "3s" }}
                className="absolute top-2/3 right-1/4 hidden lg:block"
            >
                <div className="w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center border border-gray-200">
                    <span className="text-sm">🎒</span> {/* рюкзак */}
                </div>
            </motion.div>


            {/* Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">

                    {/* Badge with Animation */}
                    <motion.div
                        variants={headingVariants}
                        initial="hidden"
                        animate="visible"
                        custom={0}
                        className="inline-flex items-center rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm text-gray-600 backdrop-blur-sm mb-8 shadow-sm"
                    >
                        <span className="mr-2 animate-pulse">✨</span>
                        {t('nav.newArrivals')} {new Date().getFullYear()}
                        <span className="ml-2 bg-black text-white text-xs px-2 py-1 rounded-full">NEW</span>
                    </motion.div>

                    {/* Main Title with Gradient Text */}
                    <motion.h1
                        variants={headingVariants}
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
                    >
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              {t('hero.title')}
            </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        variants={headingVariants}
                        initial="hidden"
                        animate="visible"
                        custom={2}
                        className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
                    >
                        {t('hero.subtitle')}
                    </motion.p>

                    {/* Stats Row */}
                    <motion.div
                        variants={headingVariants}
                        initial="hidden"
                        animate="visible"
                        custom={3}
                        className="flex justify-center items-center gap-8 mb-10"
                    >
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="flex items-center justify-center mb-1">
                                    <stat.icon className="h-5 w-5 text-gray-600 mr-2" />
                                    <span className="text-2xl font-bold text-gray-900">{stat.number}</span>
                                </div>
                                <p className="text-xs text-gray-600">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={headingVariants}
                        initial="hidden"
                        animate="visible"
                        custom={4}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                    >
                        <Button
                            onClick={handleShopNow}
                            className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            {t('hero.shopNow')}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>

                        <Button
                            variant="outline"
                            className="border-2 border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300"
                        >
                            <Play className="mr-2 h-5 w-5" />
                            Watch Lookbook
                        </Button>
                    </motion.div>

                    {/* Brand Logos */}
                    <motion.div
                        variants={headingVariants}
                        initial="hidden"
                        animate="visible"
                        custom={5}
                        className="mb-16"
                    >
                        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                            {brands.map((brand, index) => (
                                <div
                                    key={index}
                                    className="text-lg font-semibold text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                >
                                    {brand}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Features with Enhanced Design */}
                    <motion.div
                        variants={headingVariants}
                        initial="hidden"
                        animate="visible"
                        custom={6}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                    >
                        {/* Переводы получаем через t('features.freeShipping'), и т.п. */}
                        <div className="group text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200/50 hover:bg-white/80 transition-all duration-300 hover:shadow-lg">
                            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-3xl">🚚</span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2 text-lg">{t('features.freeShipping')}</h3>
                            <p className="text-sm text-gray-600">{t('features.freeShippingDesc')}</p>
                        </div>

                        <div className="group text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200/50 hover:bg-white/80 transition-all duration-300 hover:shadow-lg">
                            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-3xl">↩️</span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2 text-lg">{t('features.easyReturns')}</h3>
                            <p className="text-sm text-gray-600">{t('features.easyReturnsDesc')}</p>
                        </div>

                        <div className="group text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-200/50 hover:bg-white/80 transition-all duration-300 hover:shadow-lg">
                            <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                <span className="text-3xl">⭐</span>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2 text-lg">{t('features.premiumQuality')}</h3>
                            <p className="text-sm text-gray-600">{t('features.premiumQualityDesc')}</p>
                        </div>
                    </motion.div>

                    {/* Customer Reviews Preview */}
                    <motion.div
                        variants={headingVariants}
                        initial="hidden"
                        animate="visible"
                        custom={7}
                        className="mt-16 flex justify-center items-center"
                    >
                        <div className="bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200/50 shadow-sm">
                            <div className="flex items-center gap-2">
                                <div className="flex">
                                    {[...Array(4)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                    <Star className="h-4 w-4 fill-amber-50 text-amber-50" />
                                </div>
                                <span className="text-sm text-gray-600">4/5 | 500+</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}