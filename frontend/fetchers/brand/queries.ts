import { useQuery } from "@tanstack/react-query";
import { Brand } from "@/app/(admin)/brand/page";
import axiosInstance from "@/lib/axios";

export const useBrands = () => {
  return useQuery<Brand[]>({
    queryKey: ["brands"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/brands");
      return data;
    },
  });
};

export const useBrandById = (id: number) => {
  return useQuery<Brand>({
    queryKey: ["brand", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/brands/${id}`);
      return data;
    },
  });
};
