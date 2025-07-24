import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  phoneNo: string;
  dob: string;
  gender: "MALE" | "FEMALE" | "OTHER" | "NOT_SAY";
  profileUrl: string;
  status: "ACTIVE" | "SUSPENDED" | "BLACKLISTED" | "PENDING_VERIFICATION";
  role: "CUSTOMER" | "ADMIN" | "SUPPORT";
  isFraudSuspected: boolean;
  fraudReason?: string;
  lastLoginAt?: string;
  loginAttempts: number;
  createdAt: string;
  updatedAt: string;
}

// Mock data
const mockUsers: User[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    isVerified: true,
    phoneNo: "+1234567890",
    dob: "1990-01-01",
    gender: "MALE",
    profileUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
    status: "ACTIVE",
    role: "CUSTOMER",
    isFraudSuspected: false,
    loginAttempts: 0,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    lastLoginAt: "2024-03-15T10:30:00Z"
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    isVerified: true,
    phoneNo: "+1987654321",
    dob: "1992-05-15",
    gender: "FEMALE",
    profileUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    status: "ACTIVE",
    role: "ADMIN",
    isFraudSuspected: false,
    loginAttempts: 0,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    lastLoginAt: "2024-03-16T09:45:00Z"
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.j@example.com",
    isVerified: false,
    phoneNo: "+1122334455",
    dob: "1988-12-20",
    gender: "MALE",
    profileUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    status: "PENDING_VERIFICATION",
    role: "CUSTOMER",
    isFraudSuspected: false,
    loginAttempts: 0,
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-01T00:00:00Z"
  },
  {
    id: 4,
    firstName: "Sarah",
    lastName: "Wilson",
    email: "sarah.w@example.com",
    isVerified: true,
    phoneNo: "+1654987320",
    dob: "1995-08-10",
    gender: "FEMALE",
    profileUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    status: "SUSPENDED",
    role: "CUSTOMER",
    isFraudSuspected: true,
    fraudReason: "Multiple chargebacks reported",
    loginAttempts: 5,
    createdAt: "2024-01-20T00:00:00Z",
    updatedAt: "2024-03-10T00:00:00Z",
    lastLoginAt: "2024-03-10T15:20:00Z"
  },
  {
    id: 5,
    firstName: "Robert",
    lastName: "Brown",
    email: "robert.b@example.com",
    isVerified: true,
    phoneNo: "+1789456123",
    dob: "1987-03-25",
    gender: "MALE",
    profileUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    status: "BLACKLISTED",
    role: "CUSTOMER",
    isFraudSuspected: true,
    fraudReason: "Fraudulent activity detected",
    loginAttempts: 10,
    createdAt: "2023-12-01T00:00:00Z",
    updatedAt: "2024-03-01T00:00:00Z",
    lastLoginAt: "2024-02-28T12:00:00Z"
  }
];

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      // For now, return mock data
      // const { data } = await axios.get("/api/users");
      // return data;
      return mockUsers;
    },
  });
}; 