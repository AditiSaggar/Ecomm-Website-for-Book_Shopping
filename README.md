# Ecomm Website for Book_Shopping

The project is an e-commerce platform that allows users to browse and purchase products online. It is built using a microservices architecture, which is made up of distinct components, or microservices, that are connected by REST APIs. The same microservices on the back end can be used to create many user interfaces. Though the quirks of this architectural style fascinate development teams, the benefits to corporations are considerable.

The system has two types of users - admins and customers. Admins are responsible for managing the categories, products, orders, and payments, while customers can register, login, browse products, add items to cart, checkout, and track their orders.

The back-end is built using NodeJS and ExpressJS. The data is stored in a MongoDb.

Overall, the e-commerce platform is designed to be a scalable, robust, and secure system that allows customers to shop for products(Books) online with ease. The microservices architecture and use of DevOps tools ensures that the platform can be easily maintained and updated while minimizing downtime.

<<<<<<< HEAD
Technologies Used:
Nodejs (version 18.13.0)
MongoDB
Git
Github
=======
### Technologies Used:
- Nodejs
- MongoDB
- Git
- Github

### Features:
- User authentication: customers can register, login, and manage their profile information
- Product browsing: customers can browse products by category, filter by price or other attributes, and search for specific products
- Shopping cart: customers can add items to their cart, edit the quantity of items, and remove items from their cart
- Checkout: customers can securely checkout using Stripe API to process payments
- Order management: customers can view their order history and check the status of their current orders
- Admin panel: administrators can manage product inventory, view and fulfill orders, and manage customer information

### Installation and Setup Instructions
Must have NodeJs installed in your machine
Clone the repository to your local machine
>>>>>>> master

Install dependencies by running npm install in both the root directory and the client directory 
`npm install`

To Start Server:
`npm run start`

To run the following commands to start the full project
    - Make the bash script executable: ``` chmod +x nodeServe.sh ``` 
    - Run the bash script: ``` ./nodeServe.sh ```

Manual Testing:
Postman was used for manual testing in this application.
<<<<<<< HEAD

##********************Project Architecture*********************##
project-root/
│── gateway/
│   ├── config/
│   │   └── models/
│   │       ├── aplication.json
│   │       ├── credentials.json
│   │       └── user.ts
├── gateway.config.yml
│   │   └── system.config.yml
│   │── server.ts      
│   ├──.yo-rc.json/           
│   ├── node_modules/
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
├── user-service/
│   ├── src/
│   │   ├── models/
│   │   │   └── user.ts
│   │   ├── utils/
│   │   │   ├── pubsub.ts       
│   │   │   ├── authentication.ts
│   │   │   ├── database.ts
│   │   │   └── ...
│   │   └── index.ts              
│   ├── node_modules/
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
│
├── store-service/
│   ├── src/
│   │   ├── models/
│   │   │   └── store.ts
│   │   ├── utils/
│   │   │   ├── store.pubsub.ts       
│   │   │   ├── authentication.ts
│   │   │   ├── database.ts
│   │   │   └── ...
│   │   └── index.ts              
│   ├── node_modules/
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
│
|── products-service/
│   ├── src/
│   │   ├── models/
│   │   │   └── products.ts
│   │   ├── utils/
│   │   │   ├── user.pubsub.ts       
│   │   │   ├── pubsub.ts
│   │   │   ├── 
│   │   │   └── 
│   │   └── index.ts             
│   ├── node_modules/
│   ├── package.json
│   ├── tsconfig.json
│   └── ...

=======
Every module has its own port.


Key Topics

The following topics were covered in this unit:

- User CRUD module with SignUp and Login
- Product CRUD module
- Express-Gateway
- Request method like Get, Post, Put, Delete
- JWT authorization and authentication
- Joi validation
- Sequelize ORM
- Winston error and info loggers
- Bcrypt for password hashing and compare
- Helmet
- Eslint
- PM2 for alive forever
- Prettier for code formatter
- Postman collection
- Bash script
>>>>>>> master
