import { Gender, OrderStatus, PaymentStatus } from '@prisma/client'

// Categories with subcategories
export const categories = [
  {
    id: 1,
    name: "Men's Fashion",
    imageUrl: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop",
    parentCategoryId: null,
  },
  {
    id: 2,
    name: "Women's Fashion",
    imageUrl: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1975&auto=format&fit=crop",
    parentCategoryId: null,
  },
  {
    id: 3,
    name: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop",
    parentCategoryId: 1, // Men's Fashion
  },
  {
    id: 4,
    name: "Shoes",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    parentCategoryId: 1, // Men's Fashion
  },
  {
    id: 5,
    name: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1509805225007-73e8ba4b5be8?q=80&w=2070&auto=format&fit=crop",
    parentCategoryId: 1, // Men's Fashion
  },
  {
    id: 6,
    name: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070&auto=format&fit=crop",
    parentCategoryId: 2, // Women's Fashion
  },
  {
    id: 7,
    name: "Shoes",
    imageUrl: "https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=2070&auto=format&fit=crop",
    parentCategoryId: 2, // Women's Fashion
  },
  {
    id: 8,
    name: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=2070&auto=format&fit=crop",
    parentCategoryId: 2, // Women's Fashion
  }
]

// Brands
export const brands = [
  {
    id: 1,
    name: "Nike",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/1200px-Logo_NIKE.svg.png",
  },
  {
    id: 2,
    name: "Adidas",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/1200px-Adidas_Logo.svg.png",
  },
  {
    id: 3,
    name: "Puma",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Puma_logo.svg/2560px-Puma_logo.svg.png",
  },
  {
    id: 4,
    name: "Zara",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/1200px-Zara_Logo.svg.png",
  },
  {
    id: 5,
    name: "H&M",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/H%26M-Logo.svg/1200px-H%26M-Logo.svg.png",
  }
]

// Product Option Groups and Options
export const productOptionGroups = [
  {
    id: 1,
    name: "Size",
    productOptions: [
      { id: 1, name: "S" },
      { id: 2, name: "M" },
      { id: 3, name: "L" },
      { id: 4, name: "XL" }
    ]
  },
  {
    id: 2,
    name: "Color",
    productOptions: [
      { id: 5, name: "Black" },
      { id: 6, name: "White" },
      { id: 7, name: "Red" },
      { id: 8, name: "Blue" }
    ]
  }
]

// Products with variants
export const products = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    description: "Premium cotton t-shirt with a comfortable fit",
    brandId: 1,
    categoryId: 3,
    variants: [
      {
        id: 1,
        sku: "TCT-BLK-M",
        price: 2999,
        stock: 50,
        productOptions: [2, 5], // M, Black
        images: [
          {
            id: 1,
            imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop"
          },
          {
            id: 2,
            imageUrl: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2074&auto=format&fit=crop"
          }
        ]
      },
      {
        id: 2,
        sku: "TCT-WHT-L",
        price: 2999,
        stock: 45,
        productOptions: [3, 6], // L, White
        images: [
          {
            id: 3,
            imageUrl: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1974&auto=format&fit=crop"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Running Shoes Pro",
    description: "Professional running shoes with advanced cushioning",
    brandId: 2,
    categoryId: 4,
    variants: [
      {
        id: 3,
        sku: "RS-BLK-42",
        price: 8999,
        stock: 30,
        productOptions: [5], // Black
        images: [
          {
            id: 4,
            imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"
          },
          {
            id: 5,
            imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1974&auto=format&fit=crop"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Summer Floral Dress",
    description: "Light and breezy floral dress perfect for summer",
    brandId: 4,
    categoryId: 6,
    variants: [
      {
        id: 4,
        sku: "SFD-BLU-S",
        price: 5999,
        stock: 25,
        productOptions: [1, 8], // S, Blue
        images: [
          {
            id: 6,
            imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1976&auto=format&fit=crop"
          }
        ]
      }
    ]
  }
]

// Sales
export const sales = [
  {
    id: 1,
    description: "Summer Sale",
    startDate: new Date("2024-06-01"),
    endDate: new Date("2024-06-30"),
    discount: 20,
    isPercentage: true,
    imageUrl: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2070&auto=format&fit=crop",
    products: [1, 3] // Product IDs
  },
  {
    id: 2,
    description: "Clearance Sale",
    startDate: new Date("2024-07-15"),
    endDate: new Date("2024-07-30"),
    discount: 500,
    isPercentage: false,
    imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
    products: [2] // Product IDs
  }
]

// Sample user for testing
export const sampleUser = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  password: "$2a$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // Hashed password
  isVerified: true,
  phoneNo: "+977-9876543210",
  dob: new Date("1990-01-01"),
  gender: Gender.MALE,
  profileUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop",
  addresses: [
    {
      id: 1,
      houseNo: "123",
      street: "Main Street",
      city: "Kathmandu",
      district: "Kathmandu",
      state: "Bagmati",
      pinCode: "44600",
      landmark: "Near Central Mall",
      isPrimary: true
    }
  ]
}

// Proxy users for authentication testing
export const users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    // Password: Test@123
    password: "$2b$10$9TqMxuMfwJqEwLBBLRhBZO.zdCyLBJtBfPXhNxBX0YrwNyxL3UZxG",
    isVerified: true,
    phoneNo: "+977-9876543210",
    dob: new Date("1990-01-01"),
    gender: Gender.MALE,
    profileUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop",
    role: "USER"
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    // Password: Test@123
    password: "$2b$10$9TqMxuMfwJqEwLBBLRhBZO.zdCyLBJtBfPXhNxBX0YrwNyxL3UZxG",
    isVerified: true,
    phoneNo: "+977-9876543211",
    dob: new Date("1992-05-15"),
    gender: Gender.FEMALE,
    profileUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    role: "USER"
  },
  {
    id: 3,
    firstName: "Admin",
    lastName: "User",
    email: "admin@example.com",
    // Password: Admin@123
    password: "$2b$10$dXvUzX8sEsGVyM0GX6Jk8.TxFyqp6/M2YYXm1cFcwvN/SGO5Rnx2W",
    isVerified: true,
    phoneNo: "+977-9876543212",
    dob: new Date("1988-12-25"),
    gender: Gender.NOT_SAY,
    profileUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
    role: "ADMIN"
  }
]

// Sample orders
export const orders = [
  {
    id: 1,
    price: 11998,
    status: OrderStatus.DELIVERED,
    vendor: "Nike Store",
    orderDate: new Date("2024-01-15"),
    deliveryDate: new Date("2024-01-20"),
    userId: 1,
    payment: {
      id: 1,
      paymentDate: new Date("2024-01-15"),
      amount: 11998,
      status: PaymentStatus.SUCCESS,
      referenceId: "PAY-123456",
      method: "Credit Card"
    },
    items: [
      {
        id: 1,
        price: 2999,
        quantity: 4,
        productVariantId: 1
      }
    ]
  }
]

// Sample store
export const store = {
  id: 1,
  name: "Fashion Hub",
  locationId: 1,
  contact: "+977-1-4567890",
  managerId: 1
}
