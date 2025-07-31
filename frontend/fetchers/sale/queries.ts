import { useQuery } from "@tanstack/react-query";

export interface Sale {
  id: string;
  description: string;
  startDate: Date;
  endDate: Date;
  discount: number;
  isPercentage: boolean;
  imageUrl: string;
  products: Array<{
    id: string;
    name: string;
    imageUrl: string;
  }>;
}

// Mock data for development
const mockSales: Sale[] = [
  {
    id: "1",
    description: "Summer Sale 2024",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-08-31"),
    discount: 20,
    isPercentage: true,
    imageUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a",
    products: [
      {
        id: "1",
        name: "Summer T-Shirt",
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      },
      {
        id: "2",
        name: "Beach Shorts",
        imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d",
      },
    ],
  },
  {
    id: "2",
    description: "Back to School Sale",
    startDate: new Date("2024-08-15"),
    endDate: new Date("2024-09-15"),
    discount: 15,
    isPercentage: true,
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
    products: [
      {
        id: "3",
        name: "School Backpack",
        imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
      },
    ],
  },
];

export const useSales = () => {
  return useQuery<Sale[]>({
    queryKey: ["sales"],
    queryFn: async () => {
      // TODO: Replace with actual API call
      return mockSales;
    },
  });
};

export const useSale = (id: string) => {
  return useQuery<Sale>({
    queryKey: ["sale", id],
    queryFn: async () => {
      // TODO: Replace with actual API call
      const sale = mockSales.find((s) => s.id === id);
      if (!sale) {
        throw new Error(`Sale with id ${id} not found`);
      }
      return sale;
    },
  });
}; 