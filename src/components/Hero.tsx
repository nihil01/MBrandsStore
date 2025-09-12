import { Button } from "@/components/ui/button";

interface HeroProps {
  onShopNow?: () => void;
  onViewCollection?: () => void;
}

export default function Hero({ onShopNow, onViewCollection }: HeroProps) {
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
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-background via-muted/50 to-accent/20"
        style={{
          backgroundImage: "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--muted) / 0.5) 50%, hsl(var(--accent) / 0.2) 100%)"
        }}
      />
      
      {/* Dark wash for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight" data-testid="hero-title">
            Modern Style
            <br />
            <span className="text-primary">For Every</span> Moment
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed" data-testid="hero-description">
            Discover our curated collection of premium clothing. 
            Quality materials, timeless designs, and contemporary style.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={handleShopNow}
              className="text-lg px-8 py-6 min-w-[200px]"
              data-testid="button-shop-now"
            >
              Shop Now
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={handleViewCollection}
              className="text-lg px-8 py-6 min-w-[200px] bg-background/80 backdrop-blur-sm"
              data-testid="button-view-collection"
            >
              View Collection
            </Button>
          </div>
          
          {/* Featured Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            <div className="text-center" data-testid="stat-customers">
              <div className="text-3xl font-bold text-foreground">50k+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center" data-testid="stat-products">
              <div className="text-3xl font-bold text-foreground">1000+</div>
              <div className="text-muted-foreground">Premium Products</div>
            </div>
            <div className="text-center" data-testid="stat-shipping">
              <div className="text-3xl font-bold text-foreground">Free</div>
              <div className="text-muted-foreground">Worldwide Shipping</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
    </section>
  );
}