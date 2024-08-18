# Shoppie

Shoppie is an e-commerce application with a Spring Boot backend and a Next.js TypeScript frontend. It provides functionalities for managing products, adding items to the cart, and viewing detailed product information.

## Project Overview

- **Frontend**: Next.js with TypeScript
- **Backend**: Spring Boot
- **Frontend Hosting**: Vercel
- **Backend Hosting**: Hostinger VPS

## Features

- Product listing and details
- Cart management
- Product search and filtering
- User authentication (optional)

## Development Setup

### Prerequisites

- Java 17 or later
- Docker
- Docker Compose
- Node.js (for frontend)

### Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/dipenbhat557/Shoppie.git
   cd Shoppie
   ```

2. **Navigate to the Backend Directory**

   ```bash
   cd backend
   ```

3. **Run the Backend with Docker**

   Build and run the backend services using Docker Compose:

   ```bash
   docker-compose up --build
   ```

   This will build the Docker images and start the Spring Boot application. The backend will be accessible at `http://localhost:8080` by default.

### Frontend Setup

1. **Navigate to the Frontend Directory**

   ```bash
   cd frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the Development Server**

   ```bash
   npm run dev
   ```

   The frontend will be accessible at `http://localhost:3000`.

## Deployment

### Backend Deployment on Hostinger VPS

1. **Connect to Your VPS**

   Use SSH to connect to your Hostinger VPS:

   ```bash
   ssh your-username@your-vps-ip
   ```

2. **Clone the Repository on VPS**

   Navigate to the desired directory and clone the repository:

   ```bash
   git clone https://github.com/dipenbhat557/Shoppie.git
   cd Shoppie/backend
   ```

3. **Build and Run Backend with Docker**

   Build and run the backend services using Docker Compose:

   ```bash
   docker-compose up --build -d
   ```

   The backend should now be running on your VPS. Make sure to configure your domain or IP to route to the backend application if necessary.

### Frontend Deployment on Vercel

The frontend is already deployed and can be accessed at:

- **Frontend**: [https://shoppie-git-main-dipendra-bhattas-projects.vercel.app/](https://shoppie-git-main-dipendra-bhattas-projects.vercel.app/)

## Contributing

1. **Fork the Repository**: Click the "Fork" button at the top right of this page.
2. **Clone Your Fork**: `git clone https://github.com/your-username/Shoppie.git`
3. **Create a New Branch**: `git checkout -b feature/your-feature`
4. **Make Your Changes**: Develop your feature or fix a bug.
5. **Commit Your Changes**: `git commit -am 'Add new feature'`
6. **Push to the Branch**: `git push origin feature/your-feature`
7. **Create a Pull Request**: Go to the GitHub repository and create a new pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please contact:

- **Dipendra Bhatt**: [dipenbhat557@gmail.com](mailto:dipenbhat557@gmail.com)
```

### Notes:
- Replace `your-username` and `your-vps-ip` with your actual VPS username and IP address.
- Make sure to adjust the domain or IP in the API base URL section to match your VPS setup.