# React App Setup

This guide will help you clone, set up, and run your React application.

## Prerequisites

Before proceeding, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 14.x or higher recommended)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) (comes with Node.js)

## Step-by-Step Setup

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone git@github.com:pasinduchanaka/order-management-frontend.git
```

### 2. Install Dependencies
If you're using npm: ```npm install```

### 3. Set the back end port
If you're using a backend port other than ```8010```, you need to update the baseUrl in the index.js file:```baseUrl = 'http://localhost:<your-port-here>'```
Make sure to change <your-port-here> to match your backend port.


### 4. Run the Development Server
To start the development server, run the following command: ```npm start```

This will start the app at http://localhost:3000. Open your browser and navigate to this address to view the application.

User email as ```testuser@gmail.com``` and password as ```123123```