import { db } from "./db";
import { categories, subcategories, products } from "@shared/schema";

const seedData = async () => {
  console.log("🌱 Seeding database...");

  try {
    // Create categories
    const menCategory = await db.insert(categories).values({
      name: "Men",
      description: "Men's clothing and accessories"
    }).returning();

    const womenCategory = await db.insert(categories).values({
      name: "Women", 
      description: "Women's clothing and accessories"
    }).returning();

    const accessoriesCategory = await db.insert(categories).values({
      name: "Accessories",
      description: "Bags, accessories and more"
    }).returning();

    console.log("✅ Categories created");

    // Create subcategories
    const menSubcats = await db.insert(subcategories).values([
      { name: "T-Shirts", categoryId: menCategory[0].id, description: "Men's t-shirts and tops" },
      { name: "Jeans", categoryId: menCategory[0].id, description: "Men's jeans and denim" },
      { name: "Jackets", categoryId: menCategory[0].id, description: "Men's jackets and outerwear" },
      { name: "Shoes", categoryId: menCategory[0].id, description: "Men's shoes and sneakers" }
    ]).returning();

    const womenSubcats = await db.insert(subcategories).values([
      { name: "Tops", categoryId: womenCategory[0].id, description: "Women's tops and blouses" },
      { name: "Jeans", categoryId: womenCategory[0].id, description: "Women's jeans and denim" },
      { name: "Jackets", categoryId: womenCategory[0].id, description: "Women's jackets and coats" }
    ]).returning();

    const accessoriesSubcats = await db.insert(subcategories).values([
      { name: "Bags", categoryId: accessoriesCategory[0].id, description: "Handbags, backpacks and more" }
    ]).returning();

    console.log("✅ Subcategories created");

    // Map subcategories by name for easy lookup
    const subcatMap = [...menSubcats, ...womenSubcats, ...accessoriesSubcats].reduce((acc, subcat) => {
      acc[subcat.name] = subcat.id;
      return acc;
    }, {} as Record<string, string>);

    // Create products
    await db.insert(products).values([
      {
        name: "Premium Cotton T-Shirt",
        description: "Made from 100% organic cotton, this premium t-shirt offers unmatched comfort and style. Perfect for casual wear or layering, featuring a modern fit that flatters every body type.",
        price: "49.99",
        originalPrice: "69.99",
        categoryId: menCategory[0].id,
        subcategoryId: subcatMap["T-Shirts"],
        image: "/attached_assets/generated_images/White_cotton_t-shirt_ecommerce_style_cc6e53a8.png",
        images: ["/attached_assets/generated_images/White_cotton_t-shirt_ecommerce_style_cc6e53a8.png"],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["white", "black", "navy", "gray"],
        rating: "4.5",
        reviewCount: 127,
        isNew: true,
        onSale: true,
        stock: 50
      },
      {
        name: "Slim Fit Denim Jeans",
        description: "Classic slim-fit jeans crafted from premium denim with a comfortable stretch. Features a modern cut that works perfectly for both casual and smart-casual looks.",
        price: "89.99",
        categoryId: menCategory[0].id,
        subcategoryId: subcatMap["Jeans"],
        image: "/attached_assets/generated_images/Dark_blue_denim_jeans_50e62285.png",
        images: ["/attached_assets/generated_images/Dark_blue_denim_jeans_50e62285.png"],
        sizes: ["28", "30", "32", "34", "36", "38"],
        colors: ["blue", "black", "gray"],
        rating: "4.7",
        reviewCount: 89,
        isNew: false,
        onSale: false,
        stock: 30
      },
      {
        name: "Leather Biker Jacket",
        description: "Genuine leather biker jacket with modern styling. Features asymmetrical zip closure, multiple pockets, and a comfortable lining. A timeless piece that adds edge to any outfit.",
        price: "249.99",
        originalPrice: "299.99",
        categoryId: menCategory[0].id,
        subcategoryId: subcatMap["Jackets"],
        image: "/attached_assets/generated_images/Black_leather_jacket_product_4db547f1.png",
        images: ["/attached_assets/generated_images/Black_leather_jacket_product_4db547f1.png"],
        sizes: ["S", "M", "L", "XL"],
        colors: ["black", "brown"],
        rating: "4.8",
        reviewCount: 65,
        isNew: true,
        onSale: true,
        stock: 15
      },
      {
        name: "Athletic Sneakers",
        description: "High-performance athletic sneakers designed for both style and comfort. Features breathable mesh upper, cushioned midsole, and durable rubber outsole.",
        price: "129.99",
        categoryId: menCategory[0].id,
        subcategoryId: subcatMap["Shoes"],
        image: "/attached_assets/generated_images/White_athletic_sneakers_ac51adc5.png",
        images: ["/attached_assets/generated_images/White_athletic_sneakers_ac51adc5.png"],
        sizes: ["7", "8", "9", "10", "11", "12"],
        colors: ["white", "black", "gray"],
        rating: "4.6",
        reviewCount: 134,
        isNew: false,
        onSale: false,
        stock: 25
      },
      {
        name: "Classic White Tee",
        description: "Essential white t-shirt made from soft cotton blend. Perfect basics piece that goes with everything in your wardrobe.",
        price: "39.99",
        categoryId: womenCategory[0].id,
        subcategoryId: subcatMap["Tops"],
        image: "/attached_assets/generated_images/White_cotton_t-shirt_ecommerce_style_cc6e53a8.png",
        images: ["/attached_assets/generated_images/White_cotton_t-shirt_ecommerce_style_cc6e53a8.png"],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["white"],
        rating: "4.3",
        reviewCount: 201,
        isNew: false,
        onSale: false,
        stock: 40
      },
      {
        name: "Dark Wash Jeans",
        description: "Dark wash jeans with regular fit. Made from durable denim with subtle fading for a lived-in look.",
        price: "79.99",
        categoryId: womenCategory[0].id,
        subcategoryId: subcatMap["Jeans"],
        image: "/attached_assets/generated_images/Dark_blue_denim_jeans_50e62285.png",
        images: ["/attached_assets/generated_images/Dark_blue_denim_jeans_50e62285.png"],
        sizes: ["28", "30", "32", "34", "36"],
        colors: ["blue"],
        rating: "4.4",
        reviewCount: 97,
        isNew: true,
        onSale: false,
        stock: 35
      },
      {
        name: "Sports Jacket",
        description: "Versatile sports jacket that bridges casual and formal wear. Features modern tailoring and high-quality fabric.",
        price: "189.99",
        categoryId: womenCategory[0].id,
        subcategoryId: subcatMap["Jackets"],
        image: "/attached_assets/generated_images/Black_leather_jacket_product_4db547f1.png",
        images: ["/attached_assets/generated_images/Black_leather_jacket_product_4db547f1.png"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["black", "navy"],
        rating: "4.5",
        reviewCount: 78,
        isNew: false,
        onSale: false,
        stock: 20
      },
      {
        name: "Designer Handbag",
        description: "Professional designer handbag with advanced organization. Lightweight design for optimal daily use.",
        price: "149.99",
        originalPrice: "179.99",
        categoryId: accessoriesCategory[0].id,
        subcategoryId: subcatMap["Bags"],
        image: "/attached_assets/generated_images/White_athletic_sneakers_ac51adc5.png",
        images: ["/attached_assets/generated_images/White_athletic_sneakers_ac51adc5.png"],
        sizes: ["One Size"],
        colors: ["black", "brown", "navy"],
        rating: "4.7",
        reviewCount: 156,
        isNew: true,
        onSale: true,
        stock: 12
      }
    ]);

    console.log("✅ Products created");
    console.log("🎉 Database seeded successfully!");

  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  }
};

// Run seed if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedData()
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export default seedData;