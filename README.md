Project Report: Simple E-Commerce Application (with MongoDB)
 1. Project Title

Simple E-Commerce Web Application using Node.js, Express, and MongoDB

2. Abstract

This project presents the design and development of a simple yet efficient E-Commerce Web Application that enables users to browse products, add them to their cart, and place orders. The backend is implemented using Node.js and Express.js with MongoDB as the database, ensuring scalability and flexibility in handling data. The application includes user authentication, role-based access (Admin and User), and CRUD operations for products.
The frontend is built with HTML, CSS, and JavaScript, providing a simple interface for users and administrators. This project demonstrates the integration of full-stack technologies to create a functional and secure online shopping system.

| Component          | Technology                      |
| ------------------ | ------------------------------- |
| Frontend           | HTML5, CSS3, JavaScript         |
| Backend            | Node.js, Express.js             |
| Database           | MongoDB (Mongoose ORM)          |
| Authentication     | JSON Web Token (JWT), bcrypt.js |
| Development Tools  | VS Code, Postman, npm           |
| Hosting (optional) | Render / Vercel / MongoDB Atlas |


4. System Architecture

Frontend → Backend → Database

Workflow:

User or Admin interacts with the frontend (browser).

Requests are sent to the Express backend via RESTful API.

The backend processes the request and interacts with MongoDB.

Responses are sent back as JSON data to the frontend.

Modules:

User Module: Handles registration, login, and authentication.

Product Module: Admins can add/edit/delete products; users can view them.

Cart Module: Users can add/remove items from their cart.

Order Module: Saves confirmed orders in MongoDB upon checkout.

5. Folder Structure

ecommerce-app/
│
├── server.js
├── .env
├── package.json
│
├── models/
│   ├── userModel.js
│   ├── productModel.js
│   ├── orderModel.js
│
├── routes/
│   ├── userRoutes.js
│   ├── productRoutes.js
│   ├── orderRoutes.js
│
├── public/
│   ├── index.html
│   ├── cart.html
│   ├── admin.html
│   ├── style.css
│   └── script.js
│
└── README.md

6. Functionalities
👤 User Features

Sign up and log in securely using JWT.

Browse available products.

Add or remove products from cart.

Checkout and place an order.

👨‍💼 Admin Features

Log in with admin credentials.

Add, edit, or delete products.

View all orders and manage stock.

7.Backend Description
API Endpoints

| Endpoint            | Method | Description                   |
| ------------------- | ------ | ----------------------------- |
| `/api/users/signup` | POST   | Register a new user           |
| `/api/users/login`  | POST   | Log in a user                 |
| `/api/products`     | GET    | Get all products              |
| `/api/products`     | POST   | Add new product (Admin only)  |
| `/api/products/:id` | PUT    | Update a product (Admin only) |
| `/api/products/:id` | DELETE | Delete a product (Admin only) |
| `/api/orders`       | POST   | Place an order                |

8. Frontend Overview
Pages:

Home (index.html): Displays all products with “Add to Cart” buttons.

Cart (cart.html): Displays selected products and allows users to remove items or checkout.

Admin (admin.html): Allows admin to add products via a simple form.

Key Features:

Interactive UI with localStorage for cart persistence.

REST API calls using fetch().

Simple responsive design using CSS.

9. Database Design
Collections

Users :

{ "name": "John", "email": "john@example.com", "password": "hashed", "role": "user" }


Products :

{ "name": "T-Shirt", "price": 499, "description": "Cotton T-shirt", "stock": 20 }


Orders :

{ "user": "userId", "products": ["productId"], "totalAmount": 999 }

10. Security

Passwords hashed using bcryptjs.

Authentication tokens via JWT.

Role-based access control for admin endpoints.

CORS enabled for frontend-backend communication.

11. Advantages

Scalable NoSQL database (MongoDB Atlas ready).

Clean separation of frontend and backend logic.

Secure authentication system.

Easy to extend for mobile or React frontend.

12. Future Enhancements

Add payment gateway integration (Razorpay/Stripe).

Add product images and user reviews.

Build React or Vue frontend.

Add real-time order tracking.

 13. Conclusion

The Simple E-Commerce Web Application demonstrates how modern web technologies can be combined to create a functional, secure, and scalable online store. With Node.js powering the backend, MongoDB providing flexible data storage, and a lightweight HTML-CSS-JS frontend, the application provides a strong foundation for future expansion into a production-level e-commerce system.
