import React from 'react';
import { Heart, MessageCircle, Star, MapPin, Clock, Edit, Trash2, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/currency';

interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  condition: string;
  seller: {
    id: string;
    name: string;
    rating: number;
    avatar?: string;
  };
  location: string;
  postedAt: Date;
  views: number;
  saved: boolean;
}

interface ItemCardProps {
  item: Item;
  viewMode?: 'grid' | 'list';
  showActions?: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, viewMode = 'grid', showActions = false }) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'new':
      case 'brand new':
        return 'bg-green-100 text-green-800';
      case 'like new':
        return 'bg-blue-100 text-blue-800';
      case 'good':
        return 'bg-yellow-100 text-yellow-800';
      case 'fair':
        return 'bg-orange-100 text-orange-800';
      case 'poor':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
        <div className="flex space-x-4">
          <img
            src={item.images[0]}
            alt={item.title}
            className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}>
                    {item.condition}
                  </span>
                  <span className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{item.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(item.postedAt)}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src={item.seller.avatar || `https://ui-avatars.com/api/?name=${item.seller.name}&background=3b82f6&color=fff`}
                      alt={item.seller.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm text-gray-600">{item.seller.name}</span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{item.seller.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right ml-4">
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {formatPrice(item.price)}
                </div>
                {showActions ? (
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button className={`p-2 rounded-md transition-colors ${
                      item.saved ? 'text-red-600 bg-red-50' : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                    }`}>
                      <Heart className={`h-4 w-4 ${item.saved ? 'fill-current' : ''}`} />
                    </button>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                      <MessageCircle className="h-4 w-4" />
                    </button>
                    <Link
                      to={`/payment/${item.id}`}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(item.condition)}`}>
            {item.condition}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          {showActions ? (
            <div className="flex space-x-1">
              <button className="p-2 bg-white/90 backdrop-blur-sm text-blue-600 rounded-full hover:bg-white transition-colors">
                <Edit className="h-4 w-4" />
              </button>
              <button className="p-2 bg-white/90 backdrop-blur-sm text-red-600 rounded-full hover:bg-white transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button className={`p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors ${
              item.saved ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
            }`}>
              <Heart className={`h-4 w-4 ${item.saved ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
        {item.images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
            +{item.images.length - 1}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 flex-1">
            {item.title}
          </h3>
          <div className="text-xl font-bold text-gray-900 ml-2">
            {formatPrice(item.price)}
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <MapPin className="h-4 w-4" />
            <span>{item.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{formatTime(item.postedAt)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img
              src={item.seller.avatar || `https://ui-avatars.com/api/?name=${item.seller.name}&background=3b82f6&color=fff`}
              alt={item.seller.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{item.seller.name}</p>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-600">{item.seller.rating}</span>
              </div>
            </div>
          </div>
          
          {!showActions && (
            <div className="flex space-x-2">
              <button className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center space-x-1">
                <MessageCircle className="h-3 w-3" />
                <span>Message</span>
              </button>
              <Link
                to={`/payment/${item.id}`}
                className="bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition-colors text-sm font-medium flex items-center space-x-1"
              >
                <ShoppingCart className="h-3 w-3" />
                <span>Buy</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;