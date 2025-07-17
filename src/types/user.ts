import { type AccountType, type ContactMethod } from "./enums";

export type User = {
  id: string;
  name?: string;
  surnames?: string;
  email: string;
  businessName?: string;
  password: string;
  profileImage?: string;
  birthday: string;
  phone: string;
  address: string;
  isCompany: boolean;
  accountType: AccountType;
  preferredContactMethod: ContactMethod;
  points: number;
  createdAt: string;
  updatedAt: string;
  regionId: number;
  countyId: number;
  cityId: number;
  countryId: number;
  userCategoryId?: number;
};

export type UserCategory = {
  id: number;
  name: string;
  level: number;
  categoryDiscountAmount: number;
  pointsThreshold: number;
};

export type Session = {
  id: string;
  userId: string;
  token: string;
  createdAt: string;
  expiresAt: string;
};
