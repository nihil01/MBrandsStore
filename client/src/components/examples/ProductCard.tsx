import ProductCard from '../ProductCard';
import tshirtImage from '@assets/generated_images/White_cotton_t-shirt_product_01744f91.png';

export default function ProductCardExample() {
  return (
    <div className="w-80">
      <ProductCard
        id="tshirt-1"
        name="Premium Cotton T-Shirt"
        price={49.99}
        originalPrice={69.99}
        image={tshirtImage}
        category="T-Shirts"
        isNew={true}
        onSale={true}
        onAddToCart={(id) => console.log('Added to cart:', id)}
        onQuickView={(id) => console.log('Quick view:', id)}
        onWishlist={(id) => console.log('Added to wishlist:', id)}
      />
    </div>
  );
}