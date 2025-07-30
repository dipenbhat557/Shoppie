import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateBrandDto {
  name: string;
  logo: File;
}

interface UpdateBrandDto {
  id: number;
  name: string;
  logo?: File;
}

export const useCreateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateBrandDto) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("file", data.logo);

      const response = await axiosInstance.post("/brands", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateBrandDto) => {
      const formData = new FormData();
      formData.append("name", data.name);
      if (data.logo) {
        formData.append("file", data.logo);
      }

      const response = await axiosInstance.put(`/brands/${data.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};

export const useDeleteBrand = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await axiosInstance.delete(`/brands/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};
