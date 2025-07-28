"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingCart,
  Truck,
  Wallet,
  Store,
  Plus,
  Search,
  MessageSquare,
  Percent,
  User,
  PackageSearch,
  ListPlus,
  ShoppingBag,
  BarChart,
  Settings,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const actions = [
  // Quick Actions
  {
    id: "dashboard",
    name: "Go to Dashboard",
    shortcut: ["G", "D"],
    icon: LayoutDashboard,
    link: "/dashboard",
    group: "Quick Actions",
    description: "View analytics and overview",
  },
  {
    id: "new-product",
    name: "Add New Product",
    shortcut: ["N", "P"],
    icon: Plus,
    link: "/add-product",
    group: "Quick Actions",
    description: "Create a new product listing",
  },
  {
    id: "orders",
    name: "View Orders",
    shortcut: ["G", "O"],
    icon: ShoppingCart,
    link: "/view-orders",
    group: "Quick Actions",
    description: "Manage customer orders",
  },

  // Product Management
  {
    id: "products",
    name: "All Products",
    icon: Package,
    link: "/products",
    group: "Product Management",
    description: "View and manage products",
  },
  {
    id: "categories",
    name: "Categories",
    icon: Tags,
    link: "/categories",
    group: "Product Management",
    description: "Manage product categories",
  },
  {
    id: "new-category",
    name: "Add Category",
    icon: ListPlus,
    link: "/categories/new",
    group: "Product Management",
    description: "Create a new category",
  },
  {
    id: "brands",
    name: "Brands",
    icon: ShoppingBag,
    link: "/brand",
    group: "Product Management",
    description: "Manage product brands",
  },
  {
    id: "new-brand",
    name: "Add Brand",
    icon: Plus,
    link: "/brand/new",
    group: "Product Management",
    description: "Add a new brand",
  },

  // Sales & Marketing
  {
    id: "promotions",
    name: "Promotions",
    icon: Percent,
    link: "/promotions",
    group: "Sales & Marketing",
    description: "View all promotions",
  },
  {
    id: "new-promotion",
    name: "Create Promotion",
    icon: Plus,
    link: "/promotions/new",
    group: "Sales & Marketing",
    description: "Set up a new promotion",
  },
  {
    id: "sales",
    name: "Sales",
    icon: BarChart,
    link: "/sale",
    group: "Sales & Marketing",
    description: "View all sales",
  },
  {
    id: "new-sale",
    name: "Create Sale",
    icon: Plus,
    link: "/sale/create",
    group: "Sales & Marketing",
    description: "Start a new sale",
  },

  // Order Management
  {
    id: "view-orders",
    name: "Orders",
    icon: ShoppingCart,
    link: "/view-orders",
    group: "Order Management",
    description: "View and manage orders",
  },
  {
    id: "shipments",
    name: "Shipments",
    icon: Truck,
    link: "/dispatch",
    group: "Order Management",
    description: "Track shipments",
  },
  {
    id: "payments",
    name: "Payments",
    icon: Wallet,
    link: "/payments",
    group: "Order Management",
    description: "View payment history",
  },

  // Store Management
  {
    id: "stores",
    name: "Stores",
    icon: Store,
    link: "/store",
    group: "Store Management",
    description: "Manage store locations",
  },
  {
    id: "reviews",
    name: "Reviews",
    icon: MessageSquare,
    link: "/reviews",
    group: "Store Management",
    description: "Customer reviews and ratings",
  },

  // User Management
  {
    id: "users",
    name: "Users",
    icon: User,
    link: "/user",
    group: "User Management",
    description: "Manage user accounts",
  },
];

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: { id: string; link: string }) => {
    setOpen(false);
    router.push(command.link);
  };

  return (
    <>
      <button
        className={`
          inline-flex items-center whitespace-nowrap rounded-md text-sm
          transition-all duration-200
          border shadow-sm
          bg-white hover:bg-gray-50
          h-10 px-4 py-2 relative w-full justify-start
          sm:pr-12 md:w-40 lg:w-64
          focus:outline-none focus:ring-2 focus:ring-[#FFC633] focus:ring-offset-2
        `}
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 mr-2 shrink-0 text-gray-500" />
        <span className="hidden lg:inline-flex text-gray-600">Search features...</span>
        <span className="inline-flex lg:hidden text-gray-600">Search...</span>
        <kbd className="pointer-events-none absolute right-2 top-2.5 hidden h-5 select-none items-center gap-1 rounded border bg-gray-50 px-1.5 font-mono text-[10px] font-medium text-gray-600 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Type a command or search..."
          className="border-none focus:ring-0 focus-visible:ring-0 ring-0"
        />
        <CommandList>
          <CommandEmpty>
            <div className="py-12 text-center">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600">No results found.</p>
              <p className="text-xs text-gray-500 mt-2">Try searching for actions, features, or navigation.</p>
            </div>
          </CommandEmpty>

          <CommandGroup heading="Quick Actions">
            {actions
              .filter((action) => action.group === "Quick Actions")
              .map((action) => (
                <CommandItem
                  key={action.id}
                  onSelect={() => runCommand(action)}
                  className="aria-selected:bg-[#FFC633]/10 hover:bg-[#FFC633]/10 aria-selected:text-gray-900 py-3"
                >
                  <action.icon className="mr-2 h-4 w-4 text-gray-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{action.name}</div>
                    <div className="text-xs text-gray-500">
                      {action.description}
                    </div>
                  </div>
                  {action.shortcut && (
                    <CommandShortcut>
                      ⌘ {action.shortcut.join("+")}
                    </CommandShortcut>
                  )}
                </CommandItem>
              ))}
          </CommandGroup>

          <CommandSeparator className="my-2" />

          {/* Update each CommandGroup similarly */}
          <CommandGroup heading="Product Management">
            {actions
              .filter((action) => action.group === "Product Management")
              .map((action) => (
                <CommandItem
                  key={action.id}
                  onSelect={() => runCommand(action)}
                  className="aria-selected:bg-[#FFC633]/10 hover:bg-[#FFC633]/10 aria-selected:text-gray-900 py-3"
                >
                  <action.icon className="mr-2 h-4 w-4 text-gray-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{action.name}</div>
                    <div className="text-xs text-gray-500">
                      {action.description}
                    </div>
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>

          <CommandSeparator className="my-2" />

          <CommandGroup heading="Sales & Marketing">
            {actions
              .filter((action) => action.group === "Sales & Marketing")
              .map((action) => (
                <CommandItem
                  key={action.id}
                  onSelect={() => runCommand(action)}
                  className="aria-selected:bg-[#FFC633]/10 hover:bg-[#FFC633]/10 aria-selected:text-gray-900 py-3"
                >
                  <action.icon className="mr-2 h-4 w-4 text-gray-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{action.name}</div>
                    <div className="text-xs text-gray-500">
                      {action.description}
                    </div>
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>

          <CommandSeparator className="my-2" />

          <CommandGroup heading="Order Management">
            {actions
              .filter((action) => action.group === "Order Management")
              .map((action) => (
                <CommandItem
                  key={action.id}
                  onSelect={() => runCommand(action)}
                  className="aria-selected:bg-[#FFC633]/10 hover:bg-[#FFC633]/10 aria-selected:text-gray-900 py-3"
                >
                  <action.icon className="mr-2 h-4 w-4 text-gray-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{action.name}</div>
                    <div className="text-xs text-gray-500">
                      {action.description}
                    </div>
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>

          <CommandSeparator className="my-2" />

          <CommandGroup heading="Store Management">
            {actions
              .filter((action) => action.group === "Store Management")
              .map((action) => (
                <CommandItem
                  key={action.id}
                  onSelect={() => runCommand(action)}
                  className="aria-selected:bg-[#FFC633]/10 hover:bg-[#FFC633]/10 aria-selected:text-gray-900 py-3"
                >
                  <action.icon className="mr-2 h-4 w-4 text-gray-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{action.name}</div>
                    <div className="text-xs text-gray-500">
                      {action.description}
                    </div>
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>

          <CommandSeparator className="my-2" />

          <CommandGroup heading="User Management">
            {actions
              .filter((action) => action.group === "User Management")
              .map((action) => (
                <CommandItem
                  key={action.id}
                  onSelect={() => runCommand(action)}
                  className="aria-selected:bg-[#FFC633]/10 hover:bg-[#FFC633]/10 aria-selected:text-gray-900 py-3"
                >
                  <action.icon className="mr-2 h-4 w-4 text-gray-600" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{action.name}</div>
                    <div className="text-xs text-gray-500">
                      {action.description}
                    </div>
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
