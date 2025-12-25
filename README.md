# DataViewer

A modern full-stack web application for viewing and managing product data with images. Built with ASP.NET Core 8, React, TypeScript, and PostgreSQL, featuring automatic data seeding from external APIs and a responsive user interface.

**Live Application:** https://dataviewer.paweldywan.com/

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Database](#database)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

DataViewer is a comprehensive full-stack application designed to demonstrate modern web development practices. It provides a seamless interface for browsing product catalogs with detailed information including images, pricing, ratings, and inventory data. The application automatically seeds its database with sample product data from DummyJSON API, making it perfect for demonstration and development purposes.

The project follows a clean architecture pattern with separated concerns: a dedicated data access layer, a RESTful API backend, and a modern React-based frontend that communicates efficiently with the server.

## Key Features

- **Product Catalog Management**: Browse and view detailed product information
- **Image Gallery Support**: Display multiple images per product with thumbnail previews
- **Automatic Data Seeding**: Populates database with sample data from external API on first run
- **RESTful API**: Well-structured API endpoints for product data retrieval
- **Entity Framework Migrations**: Database schema management with automatic migration support
- **Responsive UI**: Modern, mobile-friendly interface built with React and Bootstrap
- **Swagger Integration**: Interactive API documentation for easy testing and exploration
- **TypeScript Support**: Type-safe frontend development with full TypeScript integration
- **SPA Proxy**: Seamless development experience with integrated frontend and backend servers

## Architecture

DataViewer follows a three-tier architecture pattern:

```
+------------------------+
|   React Frontend       |
|   (TypeScript/Vite)    |
+------------------------+
          |
          | HTTP/REST API
          |
+------------------------+
|   ASP.NET Core API     |
|   (Web Server)         |
+------------------------+
          |
          | Entity Framework Core
          |
+------------------------+
|   PostgreSQL Database  |
+------------------------+
```

### Project Components

**DataViewer.Server**
- ASP.NET Core 8 Web API
- Handles HTTP requests and routing
- Configures dependency injection and middleware
- Serves static files for the React frontend
- Provides Swagger/OpenAPI documentation

**DataViewer.DAL (Data Access Layer)**
- Entity Framework Core 8 with PostgreSQL
- Database context and entity models
- Migration management
- Data seeding logic
- Repository pattern implementation

**dataviewer.client**
- React 18 with TypeScript
- Vite for fast development and building
- Reactstrap and Bootstrap for UI components
- Modern ESLint configuration for code quality

## Technology Stack

### Backend
- **.NET 8**: Latest .NET framework for high-performance web applications
- **ASP.NET Core**: Web framework for building RESTful APIs
- **Entity Framework Core 8**: ORM for database operations
- **Npgsql**: PostgreSQL database provider for Entity Framework
- **Swashbuckle (Swagger)**: API documentation and testing interface

### Frontend
- **React 18**: Modern JavaScript library for building user interfaces
- **TypeScript 5.6**: Static typing for JavaScript
- **Vite 5.4**: Next-generation frontend tooling for fast development
- **Bootstrap 5.3**: Responsive CSS framework
- **Reactstrap 9.2**: React components for Bootstrap
- **ESLint**: Code quality and style enforcement

### Database
- **PostgreSQL**: Open-source relational database system

### Development Tools
- **Entity Framework Migrations**: Database schema version control
- **SPA Proxy**: Development proxy for seamless frontend-backend integration
- **HTTP Client Factory**: Efficient HTTP client management

## Getting Started

### Prerequisites

Before running the application, ensure you have the following installed:

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0) - Latest version
- [Node.js](https://nodejs.org/) - LTS version (18.x or higher)
- [PostgreSQL](https://www.postgresql.org/download/) - Version 12 or higher
- A code editor (recommended: [Visual Studio 2022](https://visualstudio.microsoft.com/) or [VS Code](https://code.visualstudio.com/))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/paweldywan/DataViewer.git
cd DataViewer
```

2. **Configure the database connection**

Create or update `DataViewer.Server/appsettings.Development.json` with your PostgreSQL connection string:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=dataviewer;Username=your_username;Password=your_password"
  }
}
```

3. **Restore backend dependencies**

```bash
cd DataViewer.Server
dotnet restore
```

4. **Install frontend dependencies**

```bash
cd ../dataviewer.client
npm install
```

### Running the Application

#### Option 1: Run Both Projects Simultaneously (Recommended)

From the solution root directory:

```bash
cd DataViewer.Server
dotnet run
```

This will automatically:
- Start the ASP.NET Core backend server
- Launch the Vite development server for the frontend
- Apply database migrations
- Seed the database with sample product data
- Open your browser to the application

The application will be available at:
- **Frontend**: https://localhost:5173 (Vite dev server)
- **Backend API**: https://localhost:7234 (or the port specified in launch settings)
- **Swagger UI**: https://localhost:7234/swagger

#### Option 2: Run Projects Separately

**Terminal 1 - Backend:**
```bash
cd DataViewer.Server
dotnet run
```

**Terminal 2 - Frontend:**
```bash
cd dataviewer.client
npm run dev
```

#### First Run

On the first run, the application will:
1. Create the database if it doesn't exist
2. Apply Entity Framework migrations
3. Fetch product data from https://dummyjson.com/products
4. Populate the database with sample products and images

## API Documentation

### Endpoints

#### Get All Products

```http
GET /api/product
```

Returns a list of all products with their associated images.

**Response:**
```json
[
  {
    "id": 1,
    "title": "iPhone 9",
    "description": "An apple mobile which is nothing like apple",
    "price": 549.0,
    "discountPercentage": 12.96,
    "rating": 4.69,
    "stock": 94,
    "brand": "Apple",
    "category": "smartphones",
    "thumbnail": "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
    "imagesCollection": [
      {
        "id": 1,
        "url": "https://cdn.dummyjson.com/product-images/1/1.jpg"
      }
    ]
  }
]
```

### Interactive API Documentation

When running in development mode, access the Swagger UI for interactive API testing:

```
https://localhost:7234/swagger
```

Swagger provides:
- Complete API endpoint documentation
- Request/response schema definitions
- Interactive testing interface
- Sample request/response examples

## Project Structure

```
DataViewer/
|
+-- DataViewer.Server/              # ASP.NET Core Web API
|   +-- Controllers/
|   |   +-- ProductController.cs    # Product API endpoints
|   +-- Program.cs                  # Application entry point and configuration
|   +-- appsettings.json           # Application configuration
|   +-- DataViewer.Server.csproj   # Project file
|
+-- DataViewer.DAL/                 # Data Access Layer
|   +-- Entities/
|   |   +-- Product.cs              # Product entity model
|   |   +-- Image.cs                # Image entity model
|   +-- Models/
|   |   +-- ProductsModel.cs        # External API response model
|   +-- Migrations/                 # Entity Framework migrations
|   +-- DataViewerContext.cs        # Database context
|   +-- DataViewerSeeder.cs         # Data seeding logic
|   +-- DataViewer.DAL.csproj       # Project file
|
+-- dataviewer.client/              # React Frontend
|   +-- src/
|   |   +-- App.tsx                 # Main application component
|   |   +-- main.tsx                # Application entry point
|   |   +-- interfaces.ts           # TypeScript interfaces
|   +-- package.json                # NPM dependencies
|   +-- tsconfig.json               # TypeScript configuration
|   +-- vite.config.ts              # Vite configuration
|
+-- README.md                       # Project documentation
```

## Database

### Schema

The application uses PostgreSQL with the following main entities:

**Products Table**
- `Id` (int, PK): Unique product identifier
- `Title` (string): Product name
- `Description` (string): Product description
- `Price` (float): Product price
- `DiscountPercentage` (float): Discount percentage
- `Rating` (float): Product rating
- `Stock` (int): Available stock quantity
- `Brand` (string, nullable): Product brand
- `Category` (string): Product category
- `Thumbnail` (string): Thumbnail image URL

**Images Table**
- `Id` (int, PK): Unique image identifier
- `Url` (string): Image URL

### Migrations

To create a new migration after modifying entities:

```bash
cd DataViewer.Server
dotnet ef migrations add MigrationName --project ../DataViewer.DAL
```

To apply migrations manually:

```bash
dotnet ef database update --project ../DataViewer.DAL
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Update documentation for significant changes
- Test your changes thoroughly before submitting
- Ensure all builds pass without errors

## License

This project is open source and available under the MIT License.

## Author

**Pawel Dywan**
- Website: https://paweldywan.com/
- GitHub: [@paweldywan](https://github.com/paweldywan)

## Acknowledgments

- Product data provided by [DummyJSON](https://dummyjson.com/) - A free fake REST API for testing and prototyping
- Built with [ASP.NET Core](https://dotnet.microsoft.com/apps/aspnet) - Microsoft's open-source web framework
- Frontend powered by [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- UI components from [Bootstrap](https://getbootstrap.com/) and [Reactstrap](https://reactstrap.github.io/)
- Database support by [PostgreSQL](https://www.postgresql.org/) and [Npgsql](https://www.npgsql.org/)

---

For questions, issues, or suggestions, please open an issue on GitHub or visit the live application at https://dataviewer.paweldywan.com/
