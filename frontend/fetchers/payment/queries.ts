import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export type PaymentStatus = 'FAILED' | 'PENDING' | 'SUCCESS';

export interface Payment {
  id: number;
  paymentDate: Date;
  amount: number;
  status: PaymentStatus;
  referenceId: string | null;
  method: string;
  orders: {
    id: number;
    price: number;
    status: string;
    vendor: string;
    orderDate: Date;
    deliveryDate: Date | null;
    user: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
    };
    items: {
      id: number;
      price: number;
      quantity: number;
      productVariant: {
        id: number;
        sku: string;
        price: number;
        product: {
          id: number;
          name: string;
          description: string;
        };
      };
    }[];
  }[];
}

// Fetcher functions
const fetchPayments = async (): Promise<Payment[]> => {
  const { data } = await axiosInstance.get('/payments');
  return data.map((payment: any) => ({
    ...payment,
    paymentDate: new Date(payment.paymentDate),
    orders: payment.orders.map((order: any) => ({
      ...order,
      orderDate: new Date(order.orderDate),
      deliveryDate: order.deliveryDate ? new Date(order.deliveryDate) : null,
    })),
  }));
};

const fetchPaymentById = async (id: number): Promise<Payment> => {
  const { data } = await axiosInstance.get(`/payments/${id}`);
  return {
    ...data,
    paymentDate: new Date(data.paymentDate),
    orders: data.orders.map((order: any) => ({
      ...order,
      orderDate: new Date(order.orderDate),
      deliveryDate: order.deliveryDate ? new Date(order.deliveryDate) : null,
    })),
  };
};

// Query hooks
export const usePayments = () => {
  return useQuery({
    queryKey: ['payments'],
    queryFn: fetchPayments,
  });
};

export const usePaymentById = (id: number) => {
  return useQuery({
    queryKey: ['payments', id],
    queryFn: () => fetchPaymentById(id),
    enabled: !!id,
  });
};
