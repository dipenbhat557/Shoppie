'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, ChevronRight } from 'lucide-react'
import { useCategories, organizeCategoriesIntoTree, Category } from '@/fetchers/category/queries'
import { useCreateCategory, useUpdateCategory, useDeleteCategory } from '@/fetchers/category/mutation'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import Image from 'next/image'

export default function CategoriesPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const [name, setName] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')

  const { data: categories, isLoading } = useCategories()
  const createCategory = useCreateCategory()
  const updateCategory = useUpdateCategory()
  const deleteCategory = useDeleteCategory()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name || (!selectedCategory && !image)) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      if (selectedCategory) {
        await updateCategory.mutateAsync({
          id: selectedCategory.id,
          name,
          parentCategoryId: selectedParentId,
          image: image || undefined,
        })
      } else {
        await createCategory.mutateAsync({
          name,
          parentCategoryId: selectedParentId,
          image: image!,
        })
      }
      resetForm()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleDelete = async (category: Category) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory.mutateAsync(category.id)
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  const resetForm = () => {
    setIsOpen(false)
    setSelectedCategory(null)
    setSelectedParentId(null)
    setName('')
    setImage(null)
    setImagePreview('')
  }

  const handleEdit = (category: Category) => {
    setSelectedCategory(category)
    setName(category.name)
    setSelectedParentId(category.parentCategoryId)
    setImagePreview(category.imageUrl)
    setIsOpen(true)
  }

  const renderCategoryTree = (categories: Category[], level = 0) => {
    return categories.map((category) => (
      <div key={category.id} className="space-y-4">
        <div 
          className={`flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-100
            ${level > 0 ? 'ml-8' : ''}`}
        >
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 relative rounded-lg overflow-hidden">
              <Image
                src={category.imageUrl}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{category.name}</h3>
              {category.subCategories?.length && category.subCategories.length > 0 && (
                <p className="text-sm text-gray-500">
                  {category.subCategories.length} subcategories
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleEdit(category)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleDelete(category)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {category.subCategories && category.subCategories.length > 0 && (
          <div className="pl-4">
            {renderCategoryTree(category.subCategories, level + 1)}
          </div>
        )}
      </div>
    ))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  const treeCategories = organizeCategoriesIntoTree(categories || [])

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-2 bg-[#FFC633] rounded-full" />
          <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#FFC633] text-gray-900 hover:bg-[#FFD666]">
              <Plus className="w-5 h-5 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedCategory ? 'Edit Category' : 'Add New Category'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter category name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent Category (Optional)
                </label>
                <select
                  value={selectedParentId || ''}
                  onChange={(e) => setSelectedParentId(e.target.value || null)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFC633]"
                >
                  <option value="">None</option>
                  {categories?.map((category) => (
                    // Don't show the current category in the parent options to prevent circular reference
                    selectedCategory?.id !== category.id && (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    )
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image
                </label>
                <div className="space-y-4">
                  {imagePreview && (
                    <div className="relative h-40 w-full rounded-lg overflow-hidden">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="cursor-pointer"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#FFC633] text-gray-900 hover:bg-[#FFD666]"
                >
                  {selectedCategory ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {treeCategories.length > 0 ? (
          renderCategoryTree(treeCategories)
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No categories found. Create your first category!</p>
          </div>
        )}
      </div>
    </div>
  )
}