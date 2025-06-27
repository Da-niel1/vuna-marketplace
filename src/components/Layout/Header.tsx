import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X, MessageCircle, User, ShoppingBag, Plus, GraduationCap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import NotificationBell from '../NotificationBell';
import SearchBar from '../UI/SearchBar';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Handle search logic here
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <GraduationCap className="h-8 w-8" />
            <span className="text-xl font-bold hidden sm:block">OKRIKA CONNECT</span>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search for items, books, electronics..."
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              to="/browse"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/browse')
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Browse</span>
            </Link>
            
            {isAuthenticated && (
              <>
                <Link
                  to="/sell"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/sell')
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                >
                  <Plus className="h-4 w-4" />
                  <span>Sell</span>
                </Link>
                
                <Link
                  to="/messages"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/messages')
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Messages</span>
                </Link>

                {/* Notification Bell */}
                <NotificationBell />
                
                <Link
                  to="/profile"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/profile')
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </>
            )}

            {!isAuthenticated ? (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
            ) : (
              <button
                onClick={logout}
                className="text-gray-700 hover:text-red-600 text-sm font-medium px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                Sign Out
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search items..."
          />
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/browse"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Browse Items</span>
              </Link>
              
              {isAuthenticated && (
                <>
                  <Link
                    to="/sell"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Plus className="h-4 w-4" />
                    <span>Sell Item</span>
                  </Link>
                  
                  <Link
                    to="/messages"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Messages</span>
                  </Link>
                  
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </>
              )}

              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              ) : (
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="text-left text-gray-700 hover:text-red-600 px-3 py-2 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Sign Out
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;