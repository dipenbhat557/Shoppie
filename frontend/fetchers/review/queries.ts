import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Review {
  id: number;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    profileUrl: string;
  };
  product: {
    id: number;
    name: string;
    imageUrl: string;
  };
}

// Mock data
const mockReviews: Review[] = [
  {
    id: 1,
    rating: 5,
    comment: "Great product! The quality is excellent and delivery was fast.",
    createdAt: "2024-03-15T10:30:00Z",
    user: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      profileUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
    },
    product: {
      id: 1,
      name: "Premium Watch",
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    }
  },
  {
    id: 2,
    rating: 1,
    comment: "Product arrived damaged. Terrible experience!",
    createdAt: "2024-03-14T15:20:00Z",
    user: {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      profileUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    product: {
      id: 2,
      name: "Designer Bag",
      imageUrl: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
    }
  },
  {
    id: 3,
    rating: 4,
    comment: "Good product but shipping took longer than expected.",
    createdAt: "2024-03-13T09:15:00Z",
    user: {
      id: 3,
      firstName: "Michael",
      lastName: "Johnson",
      email: "michael.j@example.com",
      profileUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    },
    product: {
      id: 3,
      name: "Wireless Earbuds",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    }
  },
  {
    id: 4,
    rating: 2,
    comment: "The product quality is not as advertised. Very disappointed.",
    createdAt: "2024-03-12T14:45:00Z",
    user: {
      id: 4,
      firstName: "Sarah",
      lastName: "Wilson",
      email: "sarah.w@example.com",
      profileUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    },
    product: {
      id: 4,
      name: "Smart Watch",
      imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
    }
  },
  {
    id: 5,
    rating: 5,
    comment: "Absolutely love this product! Will definitely buy again.",
    createdAt: "2024-03-11T11:30:00Z",
    user: {
      id: 5,
      firstName: "Robert",
      lastName: "Brown",
      email: "robert.b@example.com",
      profileUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    },
    product: {
      id: 5,
      name: "Gaming Headset",
      imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb",
    }
  }
];

export const useReviews = () => {
  return useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      // For now, return mock data
      // const { data } = await axios.get("/api/reviews");
      // return data;
      return mockReviews;
    },
  });
}; 