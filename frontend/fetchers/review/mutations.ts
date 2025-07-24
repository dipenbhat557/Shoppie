import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Review } from "./queries";

interface UpdateReviewStatusDto {
  reviewId: number;
  adminResponse?: string;
}

interface ReportReviewDto {
  reviewId: number;
  reason: string;
}

export const useUpdateReviewStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateReviewStatusDto) => {
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};

export const useReportReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ReportReviewDto) => {
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};

export const useAddAdminResponse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reviewId, response }: { reviewId: number; response: string }) => {
      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}; 