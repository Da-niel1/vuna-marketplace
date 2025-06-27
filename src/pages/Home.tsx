import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, MessageCircle, Star, TrendingUp, Users, Shield } from 'lucide-react';
import ItemCard from '../components/ItemCard';
import CategoryGrid from '../components/UI/CategoryGrid';
import { mockItems } from '../data/mockData';

const Home: React.FC = () => {
  const featuredItems = mockItems.slice(0, 6);
  
  const categories = [
    { id: 'textbooks', name: 'Textbooks', icon: '📚', count: 156, color: 'bg-blue-100' },
    { id: 'electronics', name: 'Electronics', icon: '💻', count: 89, color: 'bg-purple-100' },
    { id: 'furniture', name: 'Furniture', icon: '🪑', count: 67, color: 'bg-green-100' },
    { id: 'clothing', name: 'Clothing', icon: '👕', count: 134, color: 'bg-pink-100' },
    { id: 'sports', name: 'Sports', icon: '⚽', count: 45, color: 'bg-orange-100' },
    { id: 'other', name: 'Other', icon: '📦', count: 78, color: 'bg-gray-100' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              OKRIKA CONNECT
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Buy and sell second-hand items within the university community. 
              Save money, help the environment, and connect with fellow students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/browse"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <Search className="h-5 w-5" />
                <span>Start Shopping</span>
              </Link>
              <Link
                to="/sell"
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Sell Your Items</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">2,500+</h3>
              <p className="text-gray-600">Active Students</p>
            </div>
            <div className="p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">15,000+</h3>
              <p className="text-gray-600">Items Sold</p>
            </div>
            <div className="p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4.8/5</h3>
              <p className="text-gray-600">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <CategoryGrid categories={categories} />

      {/* Featured Items */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Items</h2>
              <p className="text-lg text-gray-600">Recently listed items from your university</p>
            </div>
            <Link
              to="/browse"
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1"
            >
              <span>View All</span>
              <span>→</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Okrika Connect?</h2>
            <p className="text-lg text-gray-600">Safe, convenient, and designed for students</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Safe & Secure</h3>
              <p className="text-gray-600">
                University-verified users only. Meet safely on campus with built-in messaging and rating system.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Easy Communication</h3>
              <p className="text-gray-600">
                Built-in messaging system to chat with buyers and sellers. Schedule meetups and negotiate prices.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-6">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Great Deals</h3>
              <p className="text-gray-600">
                Find textbooks, electronics, and more at student-friendly prices. Save money while helping others.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;