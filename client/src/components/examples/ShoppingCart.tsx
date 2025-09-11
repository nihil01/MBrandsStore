import ShoppingCart from '../ShoppingCart';
import tshirtImage from '@assets/generated_images/White_cotton_t-shirt_product_01744f91.png';
import jeansImage from '@assets/generated_images/Dark_blue_denim_jeans_50e62285.png';

export default function ShoppingCartExample() {
  const mockItems = [
    {
      id: "1",
      name: "Premium Cotton T-Shirt",
      price: 49.99,
      image: tshirtImage,
      quantity: 2,
      size: "M"
    },
    {
      id: "2", 
      name: "Slim Fit Denim Jeans",
      price: 89.99,
      image: jeansImage,
      quantity: 1,
      size: "32"
    }
  ];

  return (
    <ShoppingCart
      items={mockItems}
      isOpen={true}
      onUpdateQuantity={(id, qty) => console.log('Update quantity:', id, qty)}
      onRemoveItem={(id) => console.log('Remove item:', id)}
      onCheckout={() => console.log('Checkout clicked')}
    />
  );
}