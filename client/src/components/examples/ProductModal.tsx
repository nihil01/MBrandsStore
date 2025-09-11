import ProductModal from '../ProductModal';
import tshirtImage from '@assets/generated_images/White_cotton_t-shirt_product_01744f91.png';

export default function ProductModalExample() {
  const mockProduct = {
    id: "tshirt-1",
    name: "Premium Cotton T-Shirt",
    price: 49.99,
    originalPrice: 69.99,
    images: [tshirtImage, tshirtImage, tshirtImage],
    category: "T-Shirts",
    description: "Made from 100% organic cotton, this premium t-shirt offers unmatched comfort and style. Perfect for casual wear or layering, featuring a modern fit that flatters every body type.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["white", "black", "navy", "gray"],
    rating: 4.5,
    reviewCount: 127,
    isNew: true,
    onSale: true
  };

  return (
    <ProductModal
      isOpen={true}
      onClose={() => console.log('Modal closed')}
      product={mockProduct}
      onAddToCart={(id, size, qty) => console.log('Added to cart:', id, size, qty)}
    />
  );
}