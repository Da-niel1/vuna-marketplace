import React, { useState } from 'react';
import { Star, Package, MessageCircle, Calendar, MapPin, Edit3, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import { mockItems } from '../data/mockData';

const Profile: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'listings' | 'reviews' | 'settings'>('listings');
  const [isEditing, setIsEditing] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
        <p className="text-gray-600 mb-6">You need to sign in to view your profile.</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  // Mock user listings (would come from API in real app)
  const userListings = mockItems.slice(0, 4);

  // Mock reviews data
  const reviews = [
    {
      id: '1',
      reviewer: 'Emily Davis',
      rating: 5,
      comment: 'Great seller! The textbook was exactly as described and the transaction was smooth.',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      itemTitle: 'Psychology Textbook'
    },
    {
      id: '2',
      reviewer: 'Michael Chen',
      rating: 5,
      comment: 'Fast response and fair pricing. Would definitely buy from again!',
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
      itemTitle: 'MacBook Pro'
    },
    {
      id: '3',
      reviewer: 'Sarah Johnson',
      rating: 4,
      comment: 'Good condition item, exactly what I needed for my dorm room.',
      date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
      itemTitle: 'Desk Lamp'
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Avatar */}
          <div className="relative">
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=3b82f6&color=fff&size=120`}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
                <div className="flex items-center space-x-4 text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{user.university}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined March 2024</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="flex">
                      {renderStars(user.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {user.rating} ({user.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="mt-4 sm:mt-0 flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{userListings.length}</div>
                <div className="text-sm text-gray-600">Active Listings</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">47</div>
                <div className="text-sm text-gray-600">Items Sold</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2">
                  <MessageCircle className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Response Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('listings')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'listings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            My Listings ({userListings.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'reviews'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'settings'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Settings
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {activeTab === 'listings' && (
          <div className="p-6">
            {userListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userListings.map((item) => (
                  <ItemCard key={item.id} item={item} showActions />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No listings yet</h3>
                <p className="text-gray-600 mb-6">Start selling items to build your marketplace presence</p>
                <button
                  onClick={() => navigate('/sell')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create Your First Listing
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="p-6">
            {reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.reviewer}</h4>
                        <p className="text-sm text-gray-600">About: {review.itemTitle}</p>
                      </div>
                      <div className="text-right">
                        {renderStars(review.rating)}
                        <p className="text-sm text-gray-500 mt-1">{formatDate(review.date)}</p>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                <p className="text-gray-600">Complete some transactions to start receiving reviews</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="p-6">
            <div className="max-w-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    University
                  </label>
                  <input
                    type="text"
                    defaultValue={user.university}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell other students a bit about yourself..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="pt-4">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;