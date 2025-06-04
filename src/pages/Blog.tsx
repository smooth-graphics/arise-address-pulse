
import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const posts = [
    {
      id: 1,
      slug: 'address-validation-best-practices',
      title: 'Address Validation Best Practices for E-commerce',
      excerpt: 'Learn how to implement robust address validation that reduces shipping errors and improves customer satisfaction.',
      date: '2024-03-15',
      author: 'Sarah Johnson'
    },
    {
      id: 2,
      slug: 'global-address-formats',
      title: 'Understanding Global Address Formats',
      excerpt: 'A comprehensive guide to address formats across different countries and how to handle them programmatically.',
      date: '2024-03-10',
      author: 'Michael Chen'
    },
    {
      id: 3,
      slug: 'api-integration-guide',
      title: 'Integrating Arise API in 5 Minutes',
      excerpt: 'Step-by-step tutorial on how to integrate our address validation API into your existing applications.',
      date: '2024-03-05',
      author: 'Alex Rodriguez'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-dark-charcoal">
            Arise Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest in address validation, data quality, and industry best practices.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover-lift">
                <div className="h-48 bg-gradient-to-r from-bold-red to-vibrant-orange"></div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3 text-dark-charcoal">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">{post.author}</span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-bold-red font-semibold hover:text-vibrant-orange transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
