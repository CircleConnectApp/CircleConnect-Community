# CircleConnect Community Management

Part of the CircleConnect social networking platform.

## Project Overview

CircleConnect is a scalable microservices-based social platform enabling community interactions. This repository contains the Community Management microservice responsible for creating and managing communities.

## Features

- Admin-restricted community creation
- Public community browsing
- Join/leave communities for authenticated users
- Community membership management

## Getting Started

### Prerequisites

- Node.js v14+
- PostgreSQL

### Installation

1. Clone the repository
2. Install dependencies
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` and update the values
   ```
   cp .env.example .env
   ```
4. Start the server
   ```
   npm run dev
   ```

## API Endpoints

### Public Community Routes

- `GET /communities`  
  **Authorization:** Not required  
  **Request Body:** None  

- `GET /communities/:id`  
  **Authorization:** Not required  
  **Request Body:** None  

### Authenticated User Routes

- `POST /communities/:id/join`  
  **Authorization:** Required (Bearer Token)  
  **Request Body:** None  

- `DELETE /communities/:id/leave`  
  **Authorization:** Required (Bearer Token)  
  **Request Body:** None  

- `GET /communities/user/communities`  
  **Authorization:** Required (Bearer Token)  
  **Request Body:** None  

- `GET /communities/:id/members`  
  **Authorization:** Required (Bearer Token)  
  **Request Body:** None  

### Admin Routes

- `POST /communities`  
  **Authorization:** Required (Bearer Token with Admin Role)  
  **Request Body:**  
  ```json
  {
    "name": "Community Name",
    "language": "Language",
    "description": "Community Description"
  }
  ```

## License

This project is part of CircleConnect, developed for SW Architecture and Design (Spring 2025).