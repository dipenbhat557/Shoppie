// frontend/fetchers/promotion/queries.ts
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export type PromotionType = 'PERCENTAGE' | 'FIXED_AMOUNT';
export type PromotionStatus = 'ACTIVE' | 'SCHEDULED' | 'EXPIRED' | 'DISABLED';

export interface Promotion {
  id: number;
  name: string;
  description?: string;
  type: PromotionType;
  value: number;
  status: PromotionStatus;
  startDate: Date;
  endDate: Date;
  usageLimit?: number;
  usedCount: number;
  couponCode?: string;
  minOrderValue?: number;
  products: {
    id: number;
    name: string;
  }[];
  categories: {
    id: number;
    name: string;
  }[];
  orders: {
    id: number;
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  }[];
  createdAt: Date;
  updatedAt: Date;
}

// Fetcher functions
const fetchPromotions = async (): Promise<Promotion[]> => {
  const { data } = await axiosInstance.get('/promotions');
  return data.map((promotion: any) => ({
    ...promotion,
    startDate: new Date(promotion.startDate),
    endDate: new Date(promotion.endDate),
    createdAt: new Date(promotion.createdAt),
    updatedAt: new Date(promotion.updatedAt),
  }));
};

const fetchPromotionById = async (id: number): Promise<Promotion> => {
  const { data } = await axiosInstance.get(`/promotions/${id}`);
  return {
    ...data,
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
};

// Query hooks
export const usePromotions = () => {
  return useQuery({
    queryKey: ['promotions'],
    queryFn: fetchPromotions,
  });
};

export const usePromotionById = (id: number) => {
  return useQuery({
    queryKey: ['promotions', id],
    queryFn: () => fetchPromotionById(id),
    enabled: !!id,
  });
};