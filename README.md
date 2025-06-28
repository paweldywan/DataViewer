# DataViewer

DataViewer is a full-stack application for viewing and managing product data, including images, using a modern web interface and a .NET backend.

## Features
- Product listing and details
- Image management
- Responsive UI built with React and Vite
- Backend API built with ASP.NET Core and Entity Framework Core

## Project Structure
- `dataviewer.client/` - Frontend React application (TypeScript, Vite)
- `DataViewer.Server/` - Backend ASP.NET Core Web API
- `DataViewer.DAL/` - Data access layer (Entity Framework Core)

## Getting Started

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js (LTS)](https://nodejs.org/)

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd DataViewer.Server
   ```
2. Restore dependencies and run migrations:
   ```sh
   dotnet restore
   dotnet ef database update
   ```
3. Run the backend server:
   ```sh
   dotnet run
   ```

### Frontend Setup
1. Navigate to the client folder:
   ```sh
   cd dataviewer.client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

### Accessing the App
- Frontend: [http://localhost:5173](http://localhost:5173) (default Vite port)
- Backend API: [http://localhost:5000](http://localhost:5000) (default ASP.NET Core port)

## Development
- Frontend code: `dataviewer.client/src/`
- Backend controllers: `DataViewer.Server/Controllers/`
- Data models: `DataViewer.DAL/Entities/`

## License
MIT

---

Live demo: https://dataviewer.paweldywan.com/
