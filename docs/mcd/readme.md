# Notefy Project Documentation

Welcome to the professional documentation for the **Notefy** application. This project is a robust, functional prototype designed to demonstrate modern web development standards.

## Project Vision
Notefy is a business-oriented application for managing persistent data with a focus on security, scalability, and user experience.

## Key Features
- **User Authentication**: Secure login/registration using Argon2 hashing and JWT tokens.
- **RESTful API**: Structured endpoints for managing users and notes.
- **Data Persistence**: Reliable MySQL database with a clean relational schema.
- **Dynamic Content**: Auto-generated slugs and content versioning.

## Document Index
- [API Documentation](./API_DOCUMENTATION.md): Detailed endpoint definitions and authentication guide.
- [Database Schema](./mcd/readme.md): Description of the relational model.

## Architecture
The project follows a modular architecture:
- **Client**: React-based SPA for a modern UI.
- **Server**: Express.js with a module-based repository pattern.
- **Database**: Relational MySQL schema.