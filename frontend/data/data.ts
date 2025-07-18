export const mockData = {
    brands: [
      { id: 1, name: "Nike", logoUrl: "/brands/nike.png" },
      { id: 2, name: "Adidas", logoUrl: "/brands/adidas.png" },
      { id: 3, name: "Puma", logoUrl: "/brands/puma.png" },
    ],
    
    categories: [
      { id: 1, name: "Shoes", imageUrl: "/categories/shoes.png" },
      { id: 2, name: "Clothing", imageUrl: "/categories/clothing.png" },
      { id: 3, name: "Accessories", imageUrl: "/categories/accessories.png" },
    ],
    
    stores: [
      { id: 1, name: "Main Store", contact: "123-456-7890" },
      { id: 2, name: "Downtown Branch", contact: "098-765-4321" },
      { id: 3, name: "Mall Outlet", contact: "555-555-5555" },
    ],
    
    productOptionGroups: [
      {
        id: 1,
        name: "Size",
        options: [
          { id: 1, name: "Small" },
          { id: 2, name: "Medium" },
          { id: 3, name: "Large" },
        ],
      },
      {
        id: 2,
        name: "Color",
        options: [
          { id: 4, name: "Red" },
          { id: 5, name: "Blue" },
          { id: 6, name: "Black" },
        ],
      },
    ],
  };