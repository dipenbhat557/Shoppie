import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { Category } from './queries';
import { toast } from 'sonner';

interface CreateCategoryData {
  name: string;
  parentCategoryId?: number | null;
  image: File;
}

interface UpdateCategoryData {
  id: number;
  name: string;
  parentCategoryId?: number | null;
  image?: File;
}

// Mutation functions
const createCategory = async (data: CreateCategoryData) => {
  const formData = new FormData();

  formData.append('name', data.name);
  if (data.parentCategoryId) {
    formData.append('parentCategoryId', data.parentCategoryId.toString());
  }
  formData.append('file', data.image);

  console.log("formData", formData);
  const { data: response } = await axiosInstance.post('/category', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

const updateCategory = async (data: UpdateCategoryData) => {
  const formData = new FormData();
  formData.append('name', data.name);
  if (data.parentCategoryId !== undefined) {
    formData.append('parentCategoryId', data.parentCategoryId?.toString() || '');
  }
  if (data.image) {
    formData.append('file', data.image);
  }

  const { data: response } = await axiosInstance.put<Category>(`/category/${data.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

const deleteCategory = async (id: number) => {
  await axiosInstance.delete(`/category/${id}`);
  return id;
};

// Mutation hooks
export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create category');
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update category');
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete category');
    },
  });
};
