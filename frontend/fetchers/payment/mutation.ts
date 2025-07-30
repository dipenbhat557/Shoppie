import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { Payment, PaymentStatus } from './queries';
import { toast } from 'sonner';

interface CreatePaymentData {
  amount: number;
  status: PaymentStatus;
  referenceId: string;
  method: string;
}

interface UpdatePaymentData {
  id: number;
  status: PaymentStatus;
}

// Mutation functions
const createPayment = async (data: CreatePaymentData) => {
  const { data: response } = await axiosInstance.post<Payment>('/payments', data);
  return response;
};

const updatePayment = async ({ id, status }: UpdatePaymentData) => {
  const { data: response } = await axiosInstance.put<Payment>(`/payments/${id}`, {
    status,
  });
  return response;
};

const deletePayment = async (id: number) => {
  await axiosInstance.delete(`/payments/${id}`);
  return id;
};

// Mutation hooks
export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast.success('Payment created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create payment');
    },
  });
};

export const useUpdatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast.success('Payment status updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update payment status');
    },
  });
};

export const useDeletePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      toast.success('Payment deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete payment');
    },
  });
};