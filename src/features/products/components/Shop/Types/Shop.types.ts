import { IUserProducts } from "@/types/types";


export interface FilterParams {
  category?: string;
  brand?: string;
  maxPrice?: string;
  page?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface ShopFiltersProps {
  products: IUserProducts[];
  filters: FilterParams;
  onFilterChange: (updates: Record<string, string | number | null>) => void;
}
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}


export interface ShopModuleProps {
  products?: IUserProducts[];
  isLoading?: boolean;
}
export interface ShopToolbarProps {
  totalItems: number;
  searchTerm: string;
  onSearch: (val: string) => void;
}

export interface SortControlsProps {
  onSortChange: (val: string) => void;
}

