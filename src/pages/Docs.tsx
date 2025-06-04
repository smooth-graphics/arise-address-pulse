
import React, { useState } from 'react';

const Docs = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const sidebarItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'authentication', label: 'Authentication' },
    { id: 'validation', label: 'Address Validation' },
    { id: 'batch', label: 'Batch Processing' },
    { id: 'webhooks', label: 'Webhooks' },
    { id: 'sdks', label: 'SDKs & Libraries' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-dark-charcoal">API Documentation</h1>
            <p className="text-lg text-gray-600 mb-8">
              Welcome to the Arise API documentation. Our RESTful API allows you to validate and standardize addresses globally.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-semibold mb-3 text-dark-charcoal">Base URL</h3>
              <code className="bg-gray-800 text-green-400 px-3 py-2 rounded">https://api.arise.io/v1</code>
            </div>
          </div>
        );
      case 'authentication':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-dark-charcoal">Authentication</h1>
            <p className="text-lg text-gray-600 mb-8">
              Arise API uses API keys for authentication. Include your API key in the Authorization header.
            </p>
            <div className="bg-gray-900 text-gray-100 p-6 rounded-lg mb-8">
              <pre>{`Authorization: Bearer YOUR_API_KEY`}</pre>
            </div>
          </div>
        );
      case 'validation':
        return (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-dark-charcoal">Address Validation</h1>
            <p className="text-lg text-gray-600 mb-8">
              Validate and standardize addresses using our validation endpoint.
            </p>
            <div className="bg-gray-900 text-gray-100 p-6 rounded-lg mb-8">
              <pre>{`POST /validate

{
  "address": "123 Main St, New York, NY 10001"
}

Response:
{
  "valid": true,
  "standardized": "123 Main Street, New York, NY 10001-1234",
  "components": {
    "street": "123 Main Street",
    "city": "New York",
    "state": "NY",
    "postal_code": "10001-1234"
  }
}`}</pre>
            </div>
          </div>
        );
      default:
        return <div>Content for {activeTab}</div>;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="sticky top-8">
              <h3 className="text-lg font-semibold mb-4 text-dark-charcoal">Documentation</h3>
              <ul className="space-y-2">
                {sidebarItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                        activeTab === item.id
                          ? 'bg-bold-red text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
