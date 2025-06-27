import React, { useState } from 'react';
import { Search, Send, Image, MoreVertical, MessageCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar?: string;
  };
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
  itemId?: string;
  itemTitle?: string;
  itemImage?: string;
}

const Messages: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock conversations data
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      participant: {
        id: '2',
        name: 'Emily Davis',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      },
      lastMessage: 'Is the textbook still available?',
      lastMessageTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      unreadCount: 2,
      itemId: '1',
      itemTitle: 'Introduction to Psychology Textbook',
      itemImage: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300',
      messages: [
        {
          id: '1',
          senderId: '2',
          text: 'Hi! I\'m interested in your psychology textbook. Is it still available?',
          timestamp: new Date(Date.now() - 60 * 60 * 1000),
          read: true
        },
        {
          id: '2',
          senderId: '1',
          text: 'Yes, it\'s still available! It\'s in great condition with minimal highlighting.',
          timestamp: new Date(Date.now() - 45 * 60 * 1000),
          read: true
        },
        {
          id: '3',
          senderId: '2',
          text: 'Perfect! When would be a good time to meet on campus?',
          timestamp: new Date(Date.now() - 30 * 60 * 1000),
          read: false
        }
      ]
    },
    {
      id: '2',
      participant: {
        id: '3',
        name: 'Michael Chen',
        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      },
      lastMessage: 'Thanks for the quick sale!',
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      unreadCount: 0,
      itemId: '2',
      itemTitle: 'MacBook Pro 13-inch',
      itemImage: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300',
      messages: [
        {
          id: '1',
          senderId: '3',
          text: 'Is the MacBook still under warranty?',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
          read: true
        },
        {
          id: '2',
          senderId: '1',
          text: 'Yes, it has about 8 months left on the warranty. I can show you the receipt.',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          read: true
        },
        {
          id: '3',
          senderId: '3',
          text: 'Great! I\'ll take it. Can we meet at the library tomorrow at 2 PM?',
          timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
          read: true
        },
        {
          id: '4',
          senderId: '1',
          text: 'Perfect! See you then.',
          timestamp: new Date(Date.now() - 2.2 * 60 * 60 * 1000),
          read: true
        },
        {
          id: '5',
          senderId: '3',
          text: 'Thanks for the quick sale!',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          read: true
        }
      ]
    }
  ]);

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
        <p className="text-gray-600 mb-6">You need to sign in to view your messages.</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.itemTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = conversations.find(conv => conv.id === selectedConversation);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // In a real app, you would send this to your backend
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-[calc(100vh-12rem)]">
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Messages</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedConversation === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={conversation.participant.avatar || `https://ui-avatars.com/api/?name=${conversation.participant.name}&background=3b82f6&color=fff`}
                        alt={conversation.participant.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-semibold text-gray-900 truncate">
                            {conversation.participant.name}
                          </p>
                          <div className="flex flex-col items-end space-y-1">
                            <span className="text-xs text-gray-500">
                              {formatTime(conversation.lastMessageTime)}
                            </span>
                            {conversation.unreadCount > 0 && (
                              <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                {conversation.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                        {conversation.itemTitle && (
                          <p className="text-xs text-blue-600 mt-1 truncate">
                            Re: {conversation.itemTitle}
                          </p>
                        )}
                        <p className="text-sm text-gray-600 truncate mt-1">
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <p>No conversations found</p>
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`flex-1 flex flex-col ${selectedConversation ? 'block' : 'hidden md:flex'}`}>
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={selectedConv.participant.avatar || `https://ui-avatars.com/api/?name=${selectedConv.participant.name}&background=3b82f6&color=fff`}
                        alt={selectedConv.participant.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{selectedConv.participant.name}</h3>
                        {selectedConv.itemTitle && (
                          <p className="text-sm text-gray-600">About: {selectedConv.itemTitle}</p>
                        )}
                      </div>
                    </div>
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                  
                  {selectedConv.itemImage && (
                    <div className="mt-3 flex items-center space-x-2 p-2 bg-white rounded-lg border">
                      <img
                        src={selectedConv.itemImage}
                        alt={selectedConv.itemTitle}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{selectedConv.itemTitle}</p>
                        <p className="text-xs text-gray-500">Listed item</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConv.messages.map((message) => {
                    const isFromUser = message.senderId === user?.id;
                    return (
                      <div key={message.id} className={`flex ${isFromUser ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          isFromUser 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 opacity-70 ${
                            isFromUser ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                      <Image className="h-5 w-5" />
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type a message..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="text-gray-400 mb-4">
                    <MessageCircle className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                  <p className="text-gray-600">Choose a conversation from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;