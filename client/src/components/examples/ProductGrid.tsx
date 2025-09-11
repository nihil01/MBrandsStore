import ProductGrid from '../ProductGrid';
import tshirtImage from '@assets/generated_images/White_cotton_t-shirt_product_01744f91.png';
import jeansImage from '@assets/generated_images/Dark_blue_denim_jeans_50e62285.png';
import jacketImage from '@assets/generated_images/Black_leather_jacket_product_4db547f1.png';
import sneakersImage from '@assets/generated_images/White_athletic_sneakers_ac51adc5.png';

export default function ProductGridExample() {
  const mockProducts = [
    {
      id: "1",
      name: "Premium Cotton T-Shirt",
      price: 49.99,
      originalPrice: 69.99,
      image: tshirtImage,
      category: "T-Shirts",
      isNew: true,
      onSale: true
    },
    {
      id: "2",
      name: "Slim Fit Denim Jeans",
      price: 89.99,
      image: jeansImage,
      category: "Jeans",
      isNew: false,
      onSale: false
    },
    {
      id: "3",
      name: "Leather Biker Jacket",
      price: 249.99,
      originalPrice: 299.99,
      image: jacketImage,
      category: "Jackets",
      isNew: true,
      onSale: true
    },
    {
      id: "4",
      name: "Athletic Sneakers",
      price: 129.99,
      image: sneakersImage,
      category: "Shoes",
      isNew: false,
      onSale: false
    },
    // Duplicate for pagination demo
    {
      id: "5",
      name: "Classic White Tee",
      price: 39.99,
      image: tshirtImage,
      category: "T-Shirts",
      isNew: false,
      onSale: false
    },
    {
      id: "6",
      name: "Dark Wash Jeans",
      price: 79.99,
      image: jeansImage,
      category: "Jeans",
      isNew: true,
      onSale: false
    }
  ];

  return (
    <ProductGrid
      products={mockProducts}
      onProductClick={(id) => console.log('Product clicked:', id)}
      onAddToCart={(id) => console.log('Added to cart:', id)}
      onWishlist={(id) => console.log('Added to wishlist:', id)}
    />
  );
}