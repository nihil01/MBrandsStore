import { Button } from "@/components/ui/button";

interface HeroProps {
    onShopNow?: () => void;
    onViewCollection?: () => void;
    highlightColor: string;
}

export default function Hero({ onShopNow, onViewCollection, highlightColor }: HeroProps) {
    const handleShopNow = () => {
        onShopNow?.();
        console.log('Shop now clicked');
    };

    const handleViewCollection = () => {
        onViewCollection?.();
        console.log('View collection clicked');
    };

    return (
        <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
            {/* Background with dark overlay for readability */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        Modern Style
                        <br />
                        <span style={{ color: highlightColor }}>For Every</span> Moment
                    </h1>

                    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed text-white/80">
                        Discover our curated collection of premium clothing.
                        Quality materials, timeless designs, and contemporary style.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            size="lg"
                            onClick={handleShopNow}
                            className="text-lg px-8 py-6 min-w-[200px]"
                            style={{ backgroundColor: highlightColor, color: "#1a1a1a" }} // темный текст для контраста
                        >
                            Shop Now
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleViewCollection}
                            className="text-lg px-8 py-6 min-w-[200px] backdrop-blur-sm border-2"
                            style={{ borderColor: highlightColor, color: highlightColor }}
                        >
                            View Collection
                        </Button>
                    </div>

                    {/* Featured Stats */}
                    <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">{`50k+`}</div>
                            <div className="text-white/70">Happy Customers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">{`1000+`}</div>
                            <div className="text-white/70">Premium Products</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">Free</div>
                            <div className="text-white/70">Worldwide Shipping</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            <div
                className="absolute top-20 right-20 w-32 h-32 rounded-full blur-3xl"
                style={{ backgroundColor: highlightColor + "33" }} // прозрачность
            />
            <div
                className="absolute bottom-20 left-20 w-48 h-48 rounded-full blur-3xl"
                style={{ backgroundColor: highlightColor + "33" }}
            />
        </section>
    );
}
