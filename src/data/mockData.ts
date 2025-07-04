export interface Item {
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

export const mockItems: Item[] = [
  {
    id: '1',
    title: 'Introduction to Psychology Textbook - 12th Edition',
    description: 'Excellent condition psychology textbook with minimal highlighting. Perfect for PSY 101 students. All pages intact, no water damage.',
    price: 35000,
    images: [
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/4792495/pexels-photo-4792495.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    category: 'Textbooks',
    condition: 'Like New',
    seller: {
      id: '2',
      name: 'Emily Davis',
      rating: 4.9,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    location: 'Campus Library',
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    views: 47,
    saved: false
  },
  {
    id: '2',
    title: 'MacBook Pro 13-inch (2022) - Space Gray',
    description: 'Barely used MacBook Pro with M2 chip, 8GB RAM, 256GB SSD. Comes with original charger and box. Perfect for students.',
    price: 520000,
    images: [
      'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/5240543/pexels-photo-5240543.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    category: 'Electronics',
    condition: 'Like New',
    seller: {
      id: '3',
      name: 'Michael Chen',
      rating: 4.8,
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    location: 'Student Center',
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    views: 123,
    saved: true
  },
  {
    id: '3',
    title: 'IKEA Study Desk with Chair - White',
    description: 'Compact study desk perfect for dorm rooms. Includes matching chair. Some minor wear but very functional.',
    price: 30000,
    images: [
      'https://images.pexels.com/photos/6621329/pexels-photo-6621329.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    category: 'Furniture',
    condition: 'Good',
    seller: {
      id: '4',
      name: 'Sarah Johnson',
      rating: 4.7,
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    location: 'East Dorms',
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    views: 34,
    saved: false
  },
  {
    id: '4',
    title: 'Nike Air Max 270 - Size 10 (Men\'s)',
    description: 'Gently worn Nike sneakers, still in great condition. Perfect for campus walks and workouts.',
    price: 38000,
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    category: 'Clothing',
    condition: 'Good',
    seller: {
      id: '5',
      name: 'Alex Rodriguez',
      rating: 4.6,
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    location: 'Recreation Center',
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    views: 28,
    saved: false
  },
  {
    id: '5',
    title: 'Calculus: Early Transcendentals - 8th Edition',
    description: 'Essential math textbook for CALC I & II. Good condition with some highlighting in first few chapters.',
    price: 48000,
    images: [
      'https://images.pexels.com/photos/4792491/pexels-photo-4792491.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    category: 'Textbooks',
    condition: 'Good',
    seller: {
      id: '6',
      name: 'Jessica Lee',
      rating: 4.9,
      avatar: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    location: 'Math Building',
    postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    views: 67,
    saved: true
  },
  {
    id: '6',
    title: 'Mini Fridge - Perfect for Dorm Room',
    description: 'Compact refrigerator, great for keeping drinks and snacks cold. Clean and works perfectly.',
    price: 34000,
    images: [
      'https://images.pexels.com/photos/2343465/pexels-photo-2343465.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    category: 'Furniture',
    condition: 'Good',
    seller: {
      id: '7',
      name: 'David Kim',
      rating: 4.5,
      avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    location: 'West Campus',
    postedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    views: 45,
    saved: false
  },
  {
    id: '7',
    title: 'iPad Pro 11-inch with Apple Pencil',
    description: 'Perfect for note-taking and digital art. Includes screen protector and case. Excellent for students.',
    price: 260000,
    images: [
      'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/4068314/pexels-photo-4068314.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    category: 'Electronics',
    condition: 'Like New',
    seller: {
      id: '8',
      name: 'Ashley Brown',
      rating: 4.8,
      avatar: 'https://images.pexels.com/photos/2625122/pexels-photo-2625122.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    location: 'Art Building',
    postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    views: 89,
    saved: true
  },
  {
    id: '8',
    title: 'Champion Hoodie - University Logo (Large)',
    description: 'Official university hoodie in excellent condition. Warm and comfortable, perfect for campus wear.',
    price: 14000,
    images: [
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    category: 'Clothing',
    condition: 'Like New',
    seller: {
      id: '9',
      name: 'Tyler Wilson',
      rating: 4.4,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    location: 'Student Union',
    postedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    views: 23,
    saved: false
  }
];