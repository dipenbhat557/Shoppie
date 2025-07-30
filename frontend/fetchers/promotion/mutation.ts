import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { Promotion, PromotionType, PromotionStatus } from './queries';
import { toast } from 'sonner';

interface CreatePromotionData {
  name: string;
  description?: string;
  type: PromotionType;
  value: number;
  startDate: string;
  endDate: string;
  usageLimit?: number;
  couponCode?: string;
  minOrderValue?: number;
  productIds?: number[];
  categoryIds?: number[];
}

interface UpdatePromotionData extends Partial<CreatePromotionData> {
  id: number;
  status?: PromotionStatus;
}

// Mutation functions
const createPromotion = async (data: CreatePromotionData) => {
  const { data: response } = await axiosInstance.post<Promotion>('/promotions', data);
  return response;
};

const updatePromotion = async ({ id, ...data }: UpdatePromotionData) => {
  const { data: response } = await axiosInstance.put<Promotion>(`/promotions/${id}`, data);
  return response;
};

const deletePromotion = async (id: number) => {
  await axiosInstance.delete(`/promotions/${id}`);
  return id;
};

// Mutation hooks
export const useCreatePromotion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPromotion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promotions'] });
      toast.success('Promotion created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create promotion');
    },
  });
};

export const useUpdatePromotion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePromotion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promotions'] });
      toast.success('Promotion updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update promotion');
    },
  });
};

export const useDeletePromotion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePromotion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promotions'] });
      toast.success('Promotion deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete promotion');
    },
  });
};