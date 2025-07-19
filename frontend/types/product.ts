export interface Address {
  id: number;
  houseNo: string | null;
  street: string | null;
  city: string;
  district: string;
  state: string;
  pinCode: string;
  landmark: string | null;
  isPrimary: boolean;
  userId: number;
  store: Store[];
}

export interface Brand {
  id: number;
  name: string;
  logoUrl: string;
}

export interface Category {
  id: number;
  name: string;
  imageUrl: string;
}

export interface ProductOption {
  id: number;
  name: string;
}

export interface ProductOptionGroup {
  id: number;
  name: string;
  options: ProductOption[];
}

export interface Store {
  id: number;
  name: string;
  location: Address;
  contact: string;
}
