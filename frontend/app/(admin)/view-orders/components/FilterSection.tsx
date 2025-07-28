import { useState } from "react";
import { X, Clock, Package, Truck, CheckCircle } from "lucide-react";

// frontend/app/(admin)/view-orders/types.ts
export type PaymentMethod = 'credit_card' | 'debit_card' | 'upi' | 'net_banking';
export type PaymentStatus = 'SUCCESS' | 'PENDING' | 'FAILED';
export type OrderStatus = 'PLACED' | 'ACCEPTED' | 'SHIPPED' | 'DELIVERING' | 'DELIVERED';

export interface FilterState {
  selectedStatus: OrderStatus[];
  selectedPaymentStatus: PaymentStatus[];
  selectedPaymentMethods: PaymentMethod[];
  dateRange: {
    start: Date | null;
    end: Date | null;
    preset: string;
  };
  priceRange: {
    min: string;
    max: string;
  };
}

interface FilterSectionProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const statusColors = {
  PLACED: { bg: "bg-blue-100", text: "text-blue-700", icon: Clock },
  ACCEPTED: { bg: "bg-yellow-100", text: "text-yellow-700", icon: Package },
  SHIPPED: { bg: "bg-purple-100", text: "text-purple-700", icon: Package },
  DELIVERING: { bg: "bg-orange-100", text: "text-orange-700", icon: Truck },
  DELIVERED: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
};

export const FilterSection = ({ filters, onFiltersChange }: FilterSectionProps) => {
  const [isCustomDate, setIsCustomDate] = useState(false);

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const handleDatePresetChange = (preset: string) => {
    const today = new Date();
    let start = null;
    let end = null;

    switch (preset) {
      case 'today':
        start = today;
        end = today;
        break;
      case 'yesterday':
        start = new Date(today.setDate(today.getDate() - 1));
        end = new Date(today.setDate(today.getDate() - 1));
        break;
      case 'week':
        start = new Date(today.setDate(today.getDate() - 7));
        end = new Date();
        break;
      case 'month':
        start = new Date(today.setMonth(today.getMonth() - 1));
        end = new Date();
        break;
    }

    updateFilters({
      dateRange: { start, end, preset }
    });
    setIsCustomDate(preset === 'custom');
  };

  return (
    <div className="px-6 py-4 border-b border-gray-200 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Status Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Order Status</label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(statusColors).map((status) => (
              <button
                key={status}
                onClick={() => {
                  const newStatus = status as OrderStatus;
                  updateFilters({
                    selectedStatus: filters.selectedStatus.includes(newStatus)
                      ? filters.selectedStatus.filter(s => s !== newStatus)
                      : [...filters.selectedStatus, newStatus]
                  });
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  filters.selectedStatus.includes(status as OrderStatus)
                    ? `${statusColors[status as keyof typeof statusColors].bg} 
                       ${statusColors[status as keyof typeof statusColors].text}`
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  {/* Add StatusIcon component here */}
                  {status.toLowerCase()}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Date Range</label>
          <div className="flex flex-col gap-2">
            <select
              value={filters.dateRange.preset}
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-[#FFC633] focus:ring-1 focus:ring-[#FFC633]"
              onChange={(e) => handleDatePresetChange(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
            
            {isCustomDate && (
              <div className="flex gap-2">
                <input
                  type="date"
                  value={filters.dateRange.start?.toISOString().split('T')[0] || ''}
                  onChange={(e) => updateFilters({
                    dateRange: {
                      ...filters.dateRange,
                      start: e.target.value ? new Date(e.target.value) : null
                    }
                  })}
                  className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-[#FFC633] focus:ring-1 focus:ring-[#FFC633]"
                />
                <input
                  type="date"
                  value={filters.dateRange.end?.toISOString().split('T')[0] || ''}
                  onChange={(e) => updateFilters({
                    dateRange: {
                      ...filters.dateRange,
                      end: e.target.value ? new Date(e.target.value) : null
                    }
                  })}
                  className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-[#FFC633] focus:ring-1 focus:ring-[#FFC633]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Payment Filters */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Payment</label>
          <div className="space-y-2">
            <select
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-[#FFC633] focus:ring-1 focus:ring-[#FFC633]"
              value={filters.selectedPaymentStatus[0] || ''}
              onChange={(e) => updateFilters({
                selectedPaymentStatus: e.target.value ? [e.target.value as PaymentStatus] : []
              })}
            >
              <option value="">All Payment Status</option>
              <option value="SUCCESS">Paid</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
            </select>
            <select
              className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-[#FFC633] focus:ring-1 focus:ring-[#FFC633]"
              value={filters.selectedPaymentMethods[0] || ''}
              onChange={(e) => updateFilters({
                selectedPaymentMethods: e.target.value ? [e.target.value as PaymentMethod] : []
              })}
            >
              <option value="">All Payment Methods</option>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="upi">UPI</option>
              <option value="net_banking">Net Banking</option>
            </select>
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Price Range</label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange.min}
                onChange={(e) => updateFilters({
                  priceRange: { ...filters.priceRange, min: e.target.value }
                })}
                className="w-full pl-7 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-[#FFC633] focus:ring-1 focus:ring-[#FFC633]"
              />
            </div>
            <span className="text-gray-400">to</span>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange.max}
                onChange={(e) => updateFilters({
                  priceRange: { ...filters.priceRange, max: e.target.value }
                })}
                className="w-full pl-7 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:border-[#FFC633] focus:ring-1 focus:ring-[#FFC633]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {(filters.selectedStatus.length > 0 || 
          filters.selectedPaymentMethods.length > 0 || 
          filters.selectedPaymentStatus.length > 0 ||
          filters.priceRange.min || 
          filters.priceRange.max ||
          filters.dateRange.start ||
          filters.dateRange.end) && (
          <>
            <span className="text-sm font-medium text-gray-700">Active Filters:</span>
            {/* ... Render active filter chips ... */}
            <button 
              onClick={() => onFiltersChange({
                selectedStatus: [],
                selectedPaymentStatus: [],
                selectedPaymentMethods: [],
                dateRange: { start: null, end: null, preset: 'all' },
                priceRange: { min: '', max: '' }
              })}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear all
            </button>
          </>
        )}
      </div>
    </div>
  );
};