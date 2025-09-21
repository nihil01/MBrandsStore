// lib/adminApi.ts
import {Product} from "@/App.tsx";

export const adminApi = {

    getToken(): string{
        return localStorage.getItem("authToken") || "";
    },

    async createProduct(data: any) {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === "images") {
                (value as File[]).forEach((file) => formData.append("images", file));
            } else {
                formData.append(key, value as string);
            }
        });

        const res = await fetch("/api/v1/products/add", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${this.getToken()}`,
            },
            body: formData,
        });

        if (!res.ok) {
            throw new Error("Error creating product")
        } else alert("Product added!");
    },

    async getProducts() {
        const res = await fetch("/api/v1/products", {
            headers: {
                Authorization: `Bearer ${this.getToken()}`,
            },
        });
        if (!res.ok) throw new Error("Error fetching products");
        return res.json();
    },

    async deleteProduct(id: number) {
        const res = await fetch(`/api/v1/products/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${this.getToken()}`,
            },
        });
        if (!res.ok) throw new Error("Error deleting product");
    },

    async updateProduct(id: number, data: any) {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (key === "images") {
                (value as File[]).forEach((file) => formData.append("images", file));
            } else {
                formData.append(key, value as string);
            }
        });

        const res = await fetch(`/api/v1/products/${id}`, {
            method: "PUT",
            body: formData,
            headers: {
                Authorization: `Bearer ${this.getToken()}`,
            },
        });

        if (!res.ok) throw new Error("Error updating product");
        return res.json();
    },
};


export const shopApi = {
    getProducts: async (): Promise<Product[]> => {
        const res = await fetch("/api/v1/products"); // твой бэкенд
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
    },
};


