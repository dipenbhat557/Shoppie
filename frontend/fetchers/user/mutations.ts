import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "./queries";

interface UpdateUserStatusDto {
  userId: number;
  status: User["status"];
  fraudReason?: string;
}

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserStatusDto) => {
      // For now, just update the mock data
      // const response = await axios.patch(`/api/users/${data.userId}/status`, data);
      // return response.data;

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
