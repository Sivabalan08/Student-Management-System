🎓 Student Management System API
<p align="center"> <img src="https://nestjs.com/img/logo-small.svg" width="100" alt="NestJS Logo"/> </p> <p align="center"> A RESTful backend API built using <b>NestJS</b> and <b>PostgreSQL</b> </p>
🚀 Project Overview

The Student Management System API is a backend application built to practice scalable and modular architecture using NestJS.

This project demonstrates:

  Clean project structure

  Controller → Service architecture

  PostgreSQL integration

  DTO validation

  Production-style error handling

🛠 Tech Stack

  NestJS

  TypeScript

  PostgreSQL

  TypeORM

  REST API

  Postman

📌 Features

  Create a new student

  Get all students

  Get student by ID

  Update student details

  Delete student

  DTO validation using class-validator

  Environment-based configuration

⚙️ Installation

  npm install
  ▶️ Run the Application
  # Development
  npm run start:dev

  # Production
  npm run start:prod

  Server runs at:

  http://localhost:3000

🗄 Database Configuration

  Create a .env file:

    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    DB_NAME=student_db

Make sure PostgreSQL is running.

📬 API Endpoints
Method	Endpoint	Description
  POST	/students	Create student
  GET	/students	Get all students
  GET	/students/:id	Get by ID
  PUT	/students/:id	Update student
  DELETE	/students/:id	Delete student
👨‍💻 Author

Sivabalan M

Backend Developer | NestJS | PostgreSQL | TypeScript

