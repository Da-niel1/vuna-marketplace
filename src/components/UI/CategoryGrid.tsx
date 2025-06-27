import React from 'react';
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
}

interface CategoryGridProps {
  categories: Category[];
  title?: string;
  subtitle?: string;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ 
  categories, 
  title = "Browse by Category",
  subtitle = "Find exactly what you're looking for"
}) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/browse?category=${category.id}`}
              className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-center border border-gray-100 hover:border-gray-200"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${category.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-200`}>
                {category.icon}
              </div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500">{category.count} items</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;