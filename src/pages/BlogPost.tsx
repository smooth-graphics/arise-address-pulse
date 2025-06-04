
import React from 'react';
import { useParams } from 'react-router-dom';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  // Mock blog post data - in a real app, this would come from an API
  const post = {
    title: 'Address Validation Best Practices for E-commerce',
    content: `
      Address validation is a critical component of any e-commerce platform. Poor address data can lead to 
      failed deliveries, increased costs, and frustrated customers. In this comprehensive guide, we'll explore 
      the best practices for implementing robust address validation that reduces shipping errors and improves 
      customer satisfaction.

      ## Why Address Validation Matters

      Did you know that approximately 20% of online orders contain address errors? These errors can result in:
      - Failed deliveries
      - Increased shipping costs
      - Customer dissatisfaction
      - Lost revenue

      ## Best Practices

      ### 1. Real-time Validation
      Implement real-time address validation as users type to catch errors early in the process.

      ### 2. Autocomplete Suggestions
      Provide intelligent autocomplete suggestions to help users enter accurate addresses quickly.

      ### 3. International Support
      Ensure your validation system supports international address formats and postal codes.
    `,
    author: 'Sarah Johnson',
    date: '2024-03-15',
    readTime: '5 min read'
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-dark-charcoal">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 text-gray-600">
              <span>By {post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          {/* Content */}
          <article className="prose prose-lg max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {post.content}
            </div>
          </article>

          {/* Code Example */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-4 text-dark-charcoal">Example Implementation</h3>
            <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
              <pre className="text-sm">
{`// Example API call
const validateAddress = async (address) => {
  const response = await fetch('https://api.arise.io/validate', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ address })
  });
  return response.json();
};`}
              </pre>
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <a href="/blog" className="text-bold-red font-semibold hover:text-vibrant-orange transition-colors">
              ← Back to Blog
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
