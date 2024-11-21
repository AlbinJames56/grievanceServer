# Grievance Portal - Server

## Description
This is the backend server for the Grievance Portal. It handles API requests, manages the database, and sends email notifications to users upon grievance submission and sends gmail to user upon change in status. It also supports role-based authentication.

## Features
- RESTful API for grievances, users, and superhero management.
- Role-based access control (user vs superhero).
- Email notifications for grievance ticket generation.
- Email notification for user upon update in status.
- File upload and validation for grievance attachments.
- MongoDB database integration.

---

## Technologies Used
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for building APIs.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Nodemailer**: For sending email notifications.
- **FileBase64**: To handle file uploads.

---

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https: https://github.com/AlbinJames56/grievanceServer.git
   install packages and dependencies via , npm install
   run command: node index.js
