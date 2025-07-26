import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Store } from "./queries";

export interface CreateStoreDto {
  name: string;
  contact: string;
  location: {
    houseNo?: string;
    street?: string;
    city: string;
    district: string;
    state: string;
    pinCode: string;
    landmark?: string;
  };
  managerId: number;
}

export interface UpdateStoreDto extends CreateStoreDto {
  id: number;
}

export const useCreateStore = () => {
  const queryClient = useQueryClient();

  return useMutation<Store, Error, CreateStoreDto>({
    mutationFn: async (data) => {
      // TODO: Replace with actual API call
      console.log("Creating store:", data);
      return {
        id: Math.random(),
        name: data.name,
        contact: data.contact,
        location: {
          id: Math.random(),
          ...data.location,
          isPrimary: false,
          userId: data.managerId,
        },
        manager: {
          id: data.managerId,
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phoneNo: "+1 234 567 8901",
          profileUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        },
        variants: [],
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });
};

export const useUpdateStore = () => {
  const queryClient = useQueryClient();

  return useMutation<Store, Error, UpdateStoreDto>({
    mutationFn: async (data) => {
      // TODO: Replace with actual API call
      console.log("Updating store:", data);
      return {
        id: data.id,
        name: data.name,
        contact: data.contact,
        location: {
          id: Math.random(),
          ...data.location,
          isPrimary: false,
          userId: data.managerId,
        },
        manager: {
          id: data.managerId,
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phoneNo: "+1 234 567 8901",
          profileUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        },
        variants: [],
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });
};

export const useDeleteStore = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: async (id) => {
      // TODO: Replace with actual API call
      console.log("Deleting store:", id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });
};
