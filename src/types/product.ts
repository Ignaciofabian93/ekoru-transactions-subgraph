import { type Badge, type ProductSize, type WeightUnit } from "./enums";

export type Product = {
  id: number;
  sku?: string | null;
  barcode?: string | null;
  color?: string | null;
  brand: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  hasOffer: boolean;
  offerPrice: number;
  stock: number;
  isExchangeable: boolean;
  interests: string[];
  isActive: boolean;
  ratings: number;
  ratingCount: number;
  reviewsNumber: number;
  userId: string;
  badges: Badge[];
  createdAt: Date;
  updatedAt: Date;
  productCategoryId: number;
};

export type ProductCategory = {
  id: number;
  productCategoryName: string;
  departmentCategoryId: number;
  keywords: string[];
  size?: ProductSize | null;
  weightUnit?: WeightUnit | null;
  averageWeight?: number | null;
  firstMaterialTypeId?: number | null;
  firstMaterialTypeQuantity?: number | null;
  secondMaterialTypeId?: number | null;
  secondMaterialTypeQuantity?: number | null;
  thirdMaterialTypeId?: number | null;
  thirdMaterialTypeQuantity?: number | null;
  fourthMaterialTypeId?: number | null;
  fourthMaterialTypeQuantity?: number | null;
  fifthMaterialTypeId?: number | null;
  fifthMaterialTypeQuantity?: number | null;
};

export type MaterialImpactEstimate = {
  id: number;
  materialType: string;
  estimatedCo2SavingsKG: number;
  estimatedWaterSavingsLT: number;
};

export type DepartmentCategory = {
  id: number;
  departmentCategoryName: string;
  departmentId: number;
};

export type Department = {
  id: number;
  departmentName: string;
};
