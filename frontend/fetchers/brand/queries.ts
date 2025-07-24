import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Brand } from "@/app/(admin)/brand/page";

const BRANDS_API = "/api/brands";

const mockBrands = [
  {
    id: 1,
    name: "Brand 1",
    logoUrl:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Brand 2",
    logoUrl:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop",
  },
];

export const useBrands = () => {
  return useQuery<Brand[]>({
    queryKey: ["brands"],
    queryFn: async () => {
      // const { data } = await axios.get(BRANDS_API);
      // return data

      return mockBrands;
    },
  });
};

export const useBrandById = (id: number) => {
  return useQuery<Brand>({
    queryKey: ["brand", id],
    queryFn: async () => {
      // const { data } = await axios.get(`${BRANDS_API}/${id}`);
      // return data

      const brand = mockBrands.find((brand) => brand.id === id);
      if (!brand) {
        throw new Error(`Brand with id ${id} not found`);
      }
      return brand;
    },
  });
};
