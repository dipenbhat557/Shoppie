import { useQueries, useQuery } from '@tanstack/react-query';
import { Brand, Category, Store, ProductOptionGroup } from '@/types/product';

// API functions
const fetchBrands = async (): Promise<Brand[]> => {
  const res = await fetch('/api/brands');
  if (!res.ok) throw new Error('Failed to fetch brands');
  return res.json();
};

const fetchCategories = async (): Promise<Category[]> => {
  const res = await fetch('/api/categories');
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

const fetchStores = async (): Promise<Store[]> => {
  const res = await fetch('/api/stores');
  if (!res.ok) throw new Error('Failed to fetch stores');
  return res.json();
};

const fetchProductOptionGroups = async (): Promise<ProductOptionGroup[]> => {
  const res = await fetch('/api/product-option-groups');
  if (!res.ok) throw new Error('Failed to fetch product option groups');
  return res.json();
};

export function useProductData() {
  const queries = useQueries({
    queries: [
      {
        queryKey: ['brands'],
        queryFn: fetchBrands,
      },
      {
        queryKey: ['categories'],
        queryFn: fetchCategories,
      },
      {
        queryKey: ['stores'],
        queryFn: fetchStores,
      },
      {
        queryKey: ['productOptionGroups'],
        queryFn: fetchProductOptionGroups,
      },
    ],
  });

  const [brandsQuery, categoriesQuery, storesQuery, optionGroupsQuery] = queries;

  const isLoading = queries.some(query => query.isLoading);
  const isError = queries.some(query => query.isError);
  const error = queries.find(query => query.error)?.error;

  return {
    loading: isLoading,
    error: isError ? (error as Error)?.message || 'An error occurred' : null,
    brands: brandsQuery.data || [],
    categories: categoriesQuery.data || [],
    stores: storesQuery.data || [],
    optionGroups: optionGroupsQuery.data || [],
  };
}