import { useQuery } from "@tanstack/react-query";

export interface Store {
  id: number;
  name: string;
  contact: string;
  location: {
    id: number;
    houseNo?: string;
    street?: string;
    city: string;
    district: string;
    state: string;
    pinCode: string;
    landmark?: string;
    isPrimary: boolean;
    userId: number;
  };
  manager: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNo: string;
    profileUrl: string;
  };
  variants: Array<{
    id: number;
    sku: string;
    price: number;
    stock: number;
    product: {
      name: string;
      imageUrl: string;
    };
  }>;
}

// Mock data for development
const mockStores: Store[] = [
  {
    id: 1,
    name: "Downtown Store",
    contact: "+1 234 567 8900",
    location: {
      id: 1,
      houseNo: "42",
      street: "Main Street",
      city: "New York",
      district: "Manhattan",
      state: "NY",
      pinCode: "10001",
      landmark: "Near Central Park",
      isPrimary: true,
      userId: 1,
    },
    manager: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNo: "+1 234 567 8901",
      profileUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    },
    variants: [
      {
        id: 1,
        sku: "PROD-001",
        price: 99.99,
        stock: 50,
        product: {
          name: "Premium T-Shirt",
          imageUrl:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
        },
      },
      {
        id: 2,
        sku: "PROD-002",
        price: 149.99,
        stock: 5,
        product: {
          name: "Designer Jeans",
          imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d",
        },
      },
    ],
  },
];

export const useStores = () => {
  return useQuery<Store[]>({
    queryKey: ["stores"],
    queryFn: async () => {
      // TODO: Replace with actual API call
      return mockStores;
    },
  });
};

export const useStore = (id: number) => {
  return useQuery<Store>({
    queryKey: ["store", id],
    queryFn: async () => {
      // TODO: Replace with actual API call
      const store = mockStores.find((s) => s.id === id);
      if (!store) {
        throw new Error(`Store with id ${id} not found`);
      }
      return store;
    },
  });
};
