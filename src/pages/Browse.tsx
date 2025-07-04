import React, { useState } from 'react';
import { Filter, Grid, List, Search } from 'lucide-react';
import ItemCard from '../components/ItemCard';
import ItemDetailModal from '../components/ItemDetailModal';
import FilterSidebar from '../components/FilterSidebar';
import { mockItems, Item } from '../data/mockData';

const Browse: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    condition: 'all',
    location: 'all',
    sortBy: 'newest'
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Filter and sort items
  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filters.category === 'all' || item.category.toLowerCase() === filters.category;
    const matchesCondition = filters.condition === 'all' || item.condition.toLowerCase().replace(' ', '-') === filters.condition;
    
    let matchesPrice = true;
    if (filters.priceRange !== 'all') {
      const price = item.price;
      switch (filters.priceRange) {
        case '0-10000':
          matchesPrice = price < 10000;
          break;
        case '10000-25000':
          matchesPrice = price >= 10000 && price < 25000;
          break;
        case '25000-50000':
          matchesPrice = price >= 25000 && price < 50000;
          break;
        case '50000-100000':
          matchesPrice = price >= 50000 && price < 100000;
          break;
        case '100000+':
          matchesPrice = price >= 100000;
          break;
      }
    }
    
    return matchesSearch && matchesCategory && matchesPrice && matchesCondition;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'oldest':
        return a.postedAt.getTime() - b.postedAt.getTime();
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.seller.rating - a.seller.rating;
      case 'newest':
      default:
        return b.postedAt.getTime() - a.postedAt.getTime();
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Browse Items</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className="hidden lg:block">
          <FilterSidebar
            isOpen={true}
            onClose={() => {}}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Mobile Filter Sidebar */}
        <FilterSidebar
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Items Grid */}
        <div className="flex-1">
          <div className="mb-4">
            <p className="text-gray-600">
              {filteredItems.length} items found
            </p>
          </div>
          
          {filteredItems.length > 0 ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredItems.map((item) => (
                <div key={item.id} onClick={() => setSelectedItem(item)} className="cursor-pointer">
                  <ItemCard item={item} viewMode={viewMode} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Browse;