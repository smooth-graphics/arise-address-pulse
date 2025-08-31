# Address Validation Platform

A modern, secure address validation platform built with React, TypeScript, and Tailwind CSS. Features role-based dashboards, fuzzy search capabilities, data redaction by permission tier, and comprehensive admin controls.

## 🚀 Features

- **User Authentication & Authorization**: Secure login with role-based access control
- **Role-Based Dashboards**: Different interfaces for users, organizations, and government entities
- **Advanced Search**: Fuzzy logic search with intelligent matching
- **Data Security**: Permission-based data redaction and secure handling
- **Bulk Operations**: Upload and process multiple addresses simultaneously
- **Real-time Notifications**: Live updates and alerts system
- **Responsive Design**: Mobile-first responsive interface
- **Analytics Dashboard**: Comprehensive usage and performance metrics

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: Tailwind CSS, shadcn/ui components
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Authentication**: Context-based auth system

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (optional, for containerized deployment)

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd address-validation-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:8080
   ```

### Docker Deployment

1. **Build the Docker image**
   ```bash
   docker build -t address-validation-platform .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:80 address-validation-platform
   ```

3. **Access the application**
   ```
   http://localhost:3000
   ```

### Docker Compose (Recommended)

1. **Start the application**
   ```bash
   docker-compose up -d
   ```

2. **For development with hot reload**
   ```bash
   docker-compose --profile dev up
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Dashboard-specific components
│   ├── layout/         # Layout components
│   └── ...
├── pages/              # Page components
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard pages
│   └── ...
├── contexts/           # React contexts
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── types/              # TypeScript type definitions
└── utils/              # Helper utilities
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build for development
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🐳 Docker Configuration

The project includes optimized Docker configuration:

- **Multi-stage build**: Separate build and runtime stages for smaller images
- **Nginx serving**: Production-ready static file serving
- **Security headers**: Enhanced security configuration
- **Gzip compression**: Optimized asset delivery
- **SPA routing**: Proper client-side routing support

## 📱 Responsive Design

The platform is built mobile-first with responsive breakpoints:
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Large screens: 1280px+

## 🔐 Security Features

- Role-based access control (RBAC)
- Data redaction based on user permissions
- Secure headers configuration
- Content Security Policy (CSP)
- XSS protection

## 🚀 Deployment

### Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy using Docker**
   ```bash
   docker build -t address-validation-platform .
   docker run -p 80:80 address-validation-platform
   ```

### Environment Variables

Create a `.env` file for environment-specific configuration:

```env
# API Configuration
VITE_API_URL=https://your-api-url.com
VITE_APP_NAME=Address Validation Platform

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ using modern web technologies**
