export interface ProductEntity {
    name: string; // Product name (e.g., "Organic Cardamom")
    nameAr: string; // Arabic product name
    description?: string; // Optional product description
    descriptionAr?: string; // Optional Arabic product description
    price: number; // Price per unit
    unit?: "kg" | "g" | "pack" | "litre"; // Measurement unit
    stock: number; // Available stock quantity
    isAvailable: boolean; // Availability status
    images?: string[]; // Optional array of image URLs
    createdAt?: Date; // Auto-generated timestamp
    updatedAt?: Date; // Auto-generated timestamp
}
