# E-commerce-Store ~ Shopping mall for your fashion wears
## Introduction:
In today's digital era, E-commerce websites have become an essential part of the online retail industry. Building a robust and user-friendly E-commerce website requires a combination of powerful frontend technologies and a reliable backend infrastructure. In this note, we will explore the process of building an E-commerce website using React, TypeScript, Node.js, and CSS.


# Technologies
## React:
React is a popular JavaScript library for building user interfaces. Its component-based architecture and virtual DOM make it ideal for creating dynamic and interactive web applications. React allows developers to create reusable UI components, making it easier to manage and maintain complex user interfaces in an E-commerce website.

## TypeScript:
TypeScript is a superset of JavaScript that adds static typing and other advanced features to the language. By using TypeScript, developers can catch potential errors during development, improve code readability, and enhance code editor support. TypeScript is particularly useful for large-scale projects like E-commerce websites, where maintaining code quality and scalability is crucial.

## Node.js:
Node.js is a runtime environment that allows JavaScript to run on the server-side. It provides a powerful backend infrastructure for building scalable web applications. In the context of an E-commerce website, Node.js enables server-side rendering, handles API requests, manages databases, and integrates with external services such as payment gateways and shipping providers.

## CSS:
Cascading Style Sheets (CSS) is the standard language for styling web pages. It plays a vital role in designing the visual layout and appearance of an E-commerce website. With CSS, developers can apply custom styles, responsive design, animations, and other visual enhancements to create an appealing and user-friendly interface.

# Building Process:
The process of building an E-commerce website with React, TypeScript, Node.js, and CSS typically involves the following steps:

## Planning and Design:
With the website's goals, target audience, and user experience. I Created wireframes and design mockups to visualize the layout, navigation, and overall look and feel of the website.

## Frontend Development:
Use React and TypeScript to implement the user interface components. Structure the website into reusable components for easy management and scalability. Apply CSS to style the components and ensure a visually appealing design. Implement features such as product listings, search functionality, shopping cart, user authentication, and payment integration.

## Backend Development:
I set up a Node.js server  *Server.js* to handle backend functionalities. Develop APIs for managing product data, user authentication, cart management, and order processing. Integrate with external services such as payment gateways and shipping providers to enable secure transactions and smooth order fulfillment.

Database Integration:
I used *mysql* to store and retrieve product data, user information, and order details. Implement data models and connect the backend server with the database for seamless data management.

# API 
post createTable/newTable //allows you to create a new table
post /validateLogin  // validates users on login
get /products //used to get all the products from the database
get /product/:ID // used to search fo a particular product with the ID
post /add   // used to add products to the product catalog
post /updateProducts //used to update products
post /deleteProducts  //used to delete products

![Alt text](db.png)
# Challenge
Building an E-commerce website using React, TypeScript, Node.js, and CSS offers a powerful and flexible foundation for creating a feature-rich online store. The combination of frontend and backend technologies allows for a responsive and interactive user interface, efficient data management, and seamless integration with external services.

# Risks
The store hasnt been tested on an external server and payment methods hasnt been implemented yet.

# Infrastructure:
At each stage of successful development, all the code was pushed to github.com/marvy896
To get the website populated with data, you need to install and run the backend server.

# Testing and Deployment:
To start test, install node modules by running the following command: *npm install*,
To deploy the frontend, run the following command: *npm start*
to deploy the backend server: *npm devStart*
The site isnt hosted on any external server but on a localhost.

## Acknowledgments
ALX School staff - For the help, advice and resources they provided us with during this project and during all our curriculum.
