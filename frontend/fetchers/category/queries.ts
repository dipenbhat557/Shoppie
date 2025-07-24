import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

export interface Category {
  id: number;
  name: string;
  imageUrl: string;
  parentCategoryId: number | null;
  subCategories?: Category[];
}

// Fetcher functions
const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await axiosInstance.get('/category');
  return data;
};

const fetchCategoryById = async (id: number): Promise<Category> => {
  const { data } = await axiosInstance.get(`/category/${id}`);
  return data;
};

// Query hooks
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });
};

export const useCategoryById = (id: number) => {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => fetchCategoryById(id),
    enabled: !!id,
  });
};

// Helper function to organize categories into a tree structure
export const organizeCategoriesIntoTree = (categories: Category[]): Category[] => {
  const categoryMap = new Map<number, Category>();
  const rootCategories: Category[] = [];

  // First pass: Create a map of all categories
  categories.forEach(category => {
    categoryMap.set(category.id, { ...category, subCategories: [] });
  });

  // Second pass: Organize into tree structure
  categories.forEach(category => {
    const currentCategory = categoryMap.get(category.id)!;
    
    if (category.parentCategoryId === null) {
      rootCategories.push(currentCategory);
    } else {
      const parentCategory = categoryMap.get(category.parentCategoryId);
      if (parentCategory) {
        parentCategory.subCategories = parentCategory.subCategories || [];
        parentCategory.subCategories.push(currentCategory);
      }
    }
  });

  return rootCategories;
};
