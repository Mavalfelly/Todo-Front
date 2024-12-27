TodoApp Front-End
=================

This document provides an overview of the front-end of the TodoApp, a task management application built using React. The front-end offers an intuitive user interface for adding, editing, and deleting tasks while communicating seamlessly with a Django-powered back-end.

Features
--------

The front-end includes features such as a responsive user interface, real-time updates for task operations, and secure authentication using JWT (JSON Web Tokens). The interface is constructed with modular and reusable React components for efficient development and easy maintenance.

Technologies Used
-----------------

The application is built with React for dynamic and interactive user experiences, Axios for handling API requests, React Router for navigation, and CSS for styling.

Getting Started
---------------

To set up the front-end, ensure you have Node.js and a package manager like npm or yarn installed. After cloning the repository, install the necessary dependencies and configure environment variables to connect to the Django back-end. Start the development server to launch the application on your local machine.

Folder Structure
----------------

The `src/components` directory contains reusable UI components, while `src/pages` holds page-level components like TaskList and TaskDetails. The `src/services` folder includes utility functions for API requests, and `src/styles` contains CSS files for styling the application.

API Integration
---------------

The React front-end communicates with the Django back-end using a REST API. All API endpoints are secured with JWT authentication. Ensure the Django back-end is running and accessible at the URL specified in the environment configuration.

Contributing
------------

To contribute, fork the repository and create a new branch for your changes. Commit your updates, push the branch, and submit a pull request for review.
