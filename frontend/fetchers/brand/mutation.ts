import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BRANDS_API = "/api/brands";

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
      formData.append("logo", data.logo);

      const response = await axios.post(BRANDS_API, formData, {
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
        formData.append("logo", data.logo);
      }

      const response = await axios.put(`${BRANDS_API}/${data.id}`, formData, {
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
      await axios.delete(`${BRANDS_API}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
  });
};
