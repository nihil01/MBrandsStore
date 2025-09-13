import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { adminApi } from "../lib/queryClient";
import Slider from "react-slick";

export default function AdminDashboard() {
    const [formData, setFormData] = useState<any>({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        size: "",
        color: "",
        stockQuantity: "",
        images: []
    });

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState<string[]>([]);

    // ✅ для редактирования
    const [editingProduct, setEditingProduct] = useState<any | null>(null);
    const [editData, setEditData] = useState<any | null>(null);

    const loadProducts = async () => {
        try {
            const data = await adminApi.getProducts();

            for (const product of data) {
                const images = product.images;
                const newImages = images.replace("[", "").replace("]", "");
                setImages(newImages.trim().split(","));
            }

            setProducts(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {

        loadProducts();

    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, images: Array.from(e.target.files) });
        }
    };

    const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && editData) {
            setEditData({ ...editData, images: Array.from(e.target.files) });
        }
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await adminApi.createProduct(formData);
            alert("✅ Product added!");
            setFormData({
                name: "",
                description: "",
                price: "",
                category: "",
                brand: "",
                size: "",
                color: "",
                stockQuantity: "",
                images: [],
            });
            await loadProducts();
        } catch (err) {
            console.error(err);
            alert("❌ Error adding product");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Delete this product?")) return;
        try {
            await adminApi.deleteProduct(id);
            await loadProducts();
        } catch (err) {
            console.error(err);
            alert("❌ Error deleting product");
        }
    };

    // ✅ начать редактирование
    const handleEdit = (product: any) => {
        setEditingProduct(product);
        setEditData({ ...product, images: [] });
    };

    // ✅ сохранить изменения
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProduct) return;

        try {
            await adminApi.updateProduct(editingProduct.id, editData);
            alert("✅ Product updated!");
            setEditingProduct(null);
            setEditData(null);
            await loadProducts();
        } catch (err) {
            console.error(err);
            alert("❌ Error updating product");
        }
    };

    return (
        <div className="min-h-screen bg-background p-6">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <Tabs defaultValue="add">
                <TabsList>
                    <TabsTrigger value="add">➕ Add Product</TabsTrigger>
                    <TabsTrigger value="list">📋 Product List</TabsTrigger>
                </TabsList>

                {/* --- Add product --- */}
                <TabsContent value="add">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 w-full max-w-lg bg-card p-6 rounded-lg shadow"
                    >
                        <h2 className="text-2xl font-bold">Add Product</h2>

                        {[
                            { label: "Name", key: "name" },
                            { label: "Description", key: "description", textarea: true },
                            { label: "Price", key: "price", type: "number" },
                            { label: "Category", key: "category" },
                            { label: "Brand", key: "brand" },
                            { label: "Size", key: "size" },
                            { label: "Color", key: "color" },
                            { label: "Stock Quantity", key: "stockQuantity", type: "number" },
                        ].map((field) => (
                            <div key={field.key}>
                                <Label>{field.label}</Label>
                                {field.textarea ? (
                                    <Textarea
                                        value={formData[field.key]}
                                        onChange={(e) =>
                                            setFormData({ ...formData, [field.key]: e.target.value })
                                        }
                                        required
                                    />
                                ) : (
                                    <Input
                                        type={field.type || "text"}
                                        value={formData[field.key]}
                                        onChange={(e) =>
                                            setFormData({ ...formData, [field.key]: e.target.value })
                                        }
                                        required
                                    />
                                )}
                            </div>
                        ))}

                        <div>
                            <Label>Images</Label>
                            <Input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Adding..." : "Add Product"}
                        </Button>
                    </form>
                </TabsContent>

                {/* --- Product list --- */}
                <TabsContent value="list">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {products.map((p) => (
                            <div
                                key={p.id}
                                className="bg-card p-4 rounded-lg shadow flex flex-col"
                            >
                                <h3 className="font-bold text-lg">{p.name}</h3>
                                <p className="text-sm text-muted-foreground">{p.brand}</p>
                                <p className="mt-2">{p.price} $</p>

                                <Slider {...settings} className="w-full h-screen">
                                    {
                                        images.map((src, index) => (
                                            <div key={index} className="w-full h-screen">
                                                <img
                                                    src={"http://localhost:8080/static/" + src}
                                                    alt={`preview-${index}`}
                                                    className="w-full h-full object-cover brightness-75"
                                                />
                                            </div>
                                        ))
                                    }
                                </Slider>

                                <div className="flex gap-2 mt-auto">
                                    <Button
                                        variant="outline"
                                        onClick={() => handleEdit(p)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={() => handleDelete(p.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>

            {/* --- Edit Modal --- */}
            {editingProduct && editData && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-card p-6 rounded-lg shadow-lg w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>

                        <form onSubmit={handleUpdate} className="space-y-4">
                            {[
                                { label: "Name", key: "name" },
                                { label: "Description", key: "description", textarea: true },
                                { label: "Price", key: "price", type: "number" },
                                { label: "Category", key: "category" },
                                { label: "Brand", key: "brand" },
                                { label: "Size", key: "size" },
                                { label: "Color", key: "color" },
                                { label: "Stock Quantity", key: "stockQuantity", type: "number" },
                            ].map((field) => (
                                <div key={field.key}>
                                    <Label>{field.label}</Label>
                                    {field.textarea ? (
                                        <Textarea
                                            value={editData[field.key]}
                                            onChange={(e) =>
                                                setEditData({ ...editData, [field.key]: e.target.value })
                                            }
                                            required
                                        />
                                    ) : (
                                        <Input
                                            type={field.type || "text"}
                                            value={editData[field.key]}
                                            onChange={(e) =>
                                                setEditData({ ...editData, [field.key]: e.target.value })
                                            }
                                            required
                                        />
                                    )}
                                </div>
                            ))}

                            <div>
                                <Label>Images</Label>
                                <Input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleEditFileChange}
                                />
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" className="w-full">
                                    Save Changes
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => setEditingProduct(null)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
