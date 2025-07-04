import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Building, Shield, CheckCircle, AlertCircle, User } from 'lucide-react';
import { mockItems } from '../data/mockData';
import { formatPrice } from '../utils/currency';
import { useAuth } from '../contexts/AuthContext';

const Payment: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'ussd'>('transfer');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    email: '',
    phone: ''
  });

  const item = mockItems.find(item => item.id === itemId);

  // Mock seller bank details (in real app, this would come from seller's profile)
  const sellerBankDetails = {
    bankName: 'Access Bank',
    accountNumber: '0123456789',
    accountName: item?.seller.name || 'Seller Name'
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
        <p className="text-gray-600 mb-6">You need to sign in to make a purchase.</p>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Item Not Found</h2>
        <p className="text-gray-600 mb-6">The item you're trying to purchase could not be found.</p>
        <Link
          to="/browse"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Browse Items
        </Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsProcessing(false);
    setPaymentComplete(true);
  };

  if (paymentComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Sent Successfully!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your payment for <strong>{item.title}</strong> has been sent directly to {item.seller.name}.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Amount Sent:</span>
              <span className="text-2xl font-bold text-green-600">{formatPrice(item.price)}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-mono text-sm">TXN-{Date.now()}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Paid to:</span>
              <span className="font-medium">{item.seller.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium capitalize">{paymentMethod}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-2">
                <User className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-left">
                  <p className="text-sm font-medium text-blue-900">Next Steps</p>
                  <p className="text-sm text-blue-700">
                    Contact {item.seller.name} to arrange pickup or delivery. The seller has been notified of your payment.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/messages"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Message {item.seller.name}
              </Link>
              <Link
                to="/browse"
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Pay Seller Directly</h1>
        <p className="text-gray-600 mt-2">Send payment directly to {item.seller.name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Item Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Purchase Summary</h2>
          
          <div className="flex space-x-4 mb-6">
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-2">Sold by {item.seller.name}</p>
              <p className="text-sm text-gray-500">Condition: {item.condition}</p>
            </div>
          </div>

          {/* Seller Information */}
          <div className="border-t border-gray-200 pt-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Seller Details</h3>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={item.seller.avatar || `https://ui-avatars.com/api/?name=${item.seller.name}&background=3b82f6&color=fff`}
                alt={item.seller.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">{item.seller.name}</p>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm text-gray-600">{item.seller.rating} rating</span>
                </div>
              </div>
            </div>
            
            {/* Seller Bank Details */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Payment will be sent to:</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Bank:</span>
                  <span className="font-medium text-blue-900">{sellerBankDetails.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Account:</span>
                  <span className="font-medium text-blue-900">{sellerBankDetails.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Name:</span>
                  <span className="font-medium text-blue-900">{sellerBankDetails.accountName}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-900">Total Amount</span>
              <span className="text-2xl font-bold text-green-600">{formatPrice(item.price)}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">No additional fees - pay exactly what's listed</p>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Shield className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-900">Direct Payment</p>
                <p className="text-sm text-green-700">
                  Payment goes directly to the seller. Coordinate pickup after payment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Choose Payment Method</h2>

          {/* Payment Method Selection */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => setPaymentMethod('transfer')}
              className={`p-4 border rounded-lg text-center transition-colors ${
                paymentMethod === 'transfer'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Building className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Transfer</span>
            </button>
            <button
              onClick={() => setPaymentMethod('ussd')}
              className={`p-4 border rounded-lg text-center transition-colors ${
                paymentMethod === 'ussd'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Smartphone className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">USSD</span>
            </button>
            <button
              onClick={() => setPaymentMethod('card')}
              className={`p-4 border rounded-lg text-center transition-colors ${
                paymentMethod === 'card'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CreditCard className="h-6 w-6 mx-auto mb-2" />
              <span className="text-sm font-medium">Card</span>
            </button>
          </div>

          <form onSubmit={handlePayment} className="space-y-6">
            {paymentMethod === 'transfer' && (
              <div className="text-center py-8">
                <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Bank Transfer</h3>
                <p className="text-gray-600 mb-4">
                  Transfer {formatPrice(item.price)} to {item.seller.name}'s account:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 text-left">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank:</span>
                      <span className="font-medium">{sellerBankDetails.bankName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Number:</span>
                      <span className="font-medium">{sellerBankDetails.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Name:</span>
                      <span className="font-medium">{sellerBankDetails.accountName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-bold text-green-600">{formatPrice(item.price)}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Use "{item.title.substring(0, 20)}..." as your transfer reference
                </p>
              </div>
            )}

            {paymentMethod === 'ussd' && (
              <div className="text-center py-8">
                <Smartphone className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">USSD Payment</h3>
                <p className="text-gray-600 mb-4">
                  Use these USSD codes to transfer {formatPrice(item.price)} to {item.seller.name}:
                </p>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="font-medium">GTBank: </span>
                    <span className="font-mono">*737*1*{item.price}*{sellerBankDetails.accountNumber}#</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="font-medium">Access Bank: </span>
                    <span className="font-mono">*901*1*{item.price}*{sellerBankDetails.accountNumber}#</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <span className="font-medium">First Bank: </span>
                    <span className="font-mono">*894*1*{item.price}*{sellerBankDetails.accountNumber}#</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Follow the prompts on your phone to complete the transfer
                </p>
              </div>
            )}

            {paymentMethod === 'card' && (
              <>
                <div className="bg-yellow-50 rounded-lg p-4 mb-4">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900">Card Payment</p>
                      <p className="text-sm text-yellow-700">
                        Card payment will be processed and sent directly to {item.seller.name}'s account.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                defaultValue={user?.email}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+234 801 234 5678"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Send {formatPrice(item.price)} to {item.seller.name}</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Direct Payment Notice</p>
                <p className="text-sm text-blue-700">
                  You are paying directly to the seller. Please coordinate pickup/delivery through messages after payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;