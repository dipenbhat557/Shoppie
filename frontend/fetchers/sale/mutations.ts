import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Sale } from "./queries";

export interface CreateSaleDto {
  description: string;
  startDate: Date;
  endDate: Date;
  discount: number;
  isPercentage: boolean;
  imageUrl: string;
  productIds: number[];
}

export interface UpdateSaleDto extends CreateSaleDto {
  id: number;
}

export const useCreateSale = () => {
  const queryClient = useQueryClient();

  return useMutation<Sale, Error, CreateSaleDto>({
    mutationFn: async (data) => {
      // TODO: Replace with actual API call
      console.log("Creating sale:", data);
      return {
        id: Math.random(),
        ...data,
        products: data.productIds.map((id) => ({
          id,
          name: `Product ${id}`,
          imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        })),
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
    },
  });
};

export const useUpdateSale = () => {
  const queryClient = useQueryClient();

  return useMutation<Sale, Error, UpdateSaleDto>({
    mutationFn: async (data) => {
      // TODO: Replace with actual API call
      console.log("Updating sale:", data);
      return {
        ...data,
        products: data.productIds.map((id) => ({
          id,
          name: `Product ${id}`,
          imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
        })),
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
    },
  });
};

export const useDeleteSale = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      // TODO: Replace with actual API call
      console.log("Deleting sale:", id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
    },
  });
}; 