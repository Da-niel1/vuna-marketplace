import React from 'react';
import { X, DollarSign, Package, MapPin } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    category: string;
    priceRange: string;
    condition: string;
    location: string;
    sortBy: string;
  };
  onFilterChange: (key: string, value: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange
}) => {
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'textbooks', name: 'Textbooks' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'furniture', name: 'Furniture' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'sports', name: 'Sports & Recreation' },
    { id: 'other', name: 'Other' }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: '0-25', name: 'Under $25' },
    { id: '25-50', name: '$25 - $50' },
    { id: '50-100', name: '$50 - $100' },
    { id: '100-200', name: '$100 - $200' },
    { id: '200+', name: '$200+' }
  ];

  const conditions = [
    { id: 'all', name: 'All Conditions' },
    { id: 'new', name: 'Brand New' },
    { id: 'like-new', name: 'Like New' },
    { id: 'good', name: 'Good' },
    { id: 'fair', name: 'Fair' },
    { id: 'poor', name: 'Poor' }
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'campus-library', name: 'Campus Library' },
    { id: 'student-center', name: 'Student Center' },
    { id: 'east-dorms', name: 'East Dorms' },
    { id: 'west-dorms', name: 'West Dorms' },
    { id: 'recreation-center', name: 'Recreation Center' }
  ];

  const sortOptions = [
    { id: 'newest', name: 'Newest First' },
    { id: 'oldest', name: 'Oldest First' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'rating', name: 'Highest Rated' }
  ];

  const clearAllFilters = () => {
    onFilterChange('category', 'all');
    onFilterChange('priceRange', 'all');
    onFilterChange('condition', 'all');
    onFilterChange('location', 'all');
    onFilterChange('sortBy', 'newest');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 lg:relative lg:w-64 lg:shadow-none lg:bg-transparent">
        <div className="p-6 border-b border-gray-200 lg:hidden">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto h-full">
          {/* Clear Filters */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 hidden lg:block">Filters</h3>
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear All
            </button>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <Package className="inline h-4 w-4 mr-1" />
              Category
            </label>
            <div className="space-y-2">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={filters.category === category.id}
                    onChange={(e) => onFilterChange('category', e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <DollarSign className="inline h-4 w-4 mr-1" />
              Price Range
            </label>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <label key={range.id} className="flex items-center">
                  <input
                    type="radio"
                    name="priceRange"
                    value={range.id}
                    checked={filters.priceRange === range.id}
                    onChange={(e) => onFilterChange('priceRange', e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">{range.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Condition Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Condition
            </label>
            <div className="space-y-2">
              {conditions.map((condition) => (
                <label key={condition.id} className="flex items-center">
                  <input
                    type="radio"
                    name="condition"
                    value={condition.id}
                    checked={filters.condition === condition.id}
                    onChange={(e) => onFilterChange('condition', e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">{condition.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              <MapPin className="inline h-4 w-4 mr-1" />
              Meeting Location
            </label>
            <div className="space-y-2">
              {locations.map((location) => (
                <label key={location.id} className="flex items-center">
                  <input
                    type="radio"
                    name="location"
                    value={location.id}
                    checked={filters.location === location.id}
                    onChange={(e) => onFilterChange('location', e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-700">{location.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => onFilterChange('sortBy', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;