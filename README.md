# 💼 Freelancer Platform – MERN Stack Website

A full-stack MERN (MongoDB, Express, React, Node.js) Real-time web application that connects clients and freelancers through a role-based system for posting projects, applying to jobs, managing profiles, and handling project workflows.

---

# 🚀 Core Features

## 🔐 Authentication & Security
- User Registration & Login  
- JWT-based authentication  
- Secure password hashing using Bcrypt  
- Protected routes  
- Role-based access control (Client / Freelancer)
- Prevent XSS in frontend using input validation and backend using helmet
- SQL injection prevention
---

# 👤 Role-Based Dashboards

The system provides different dashboards and permissions based on the logged-in user role.

### 🧑‍💻 Freelancer Features
- Create & update professional profile  
- Upload resume  
- Add skills and experience  
- Browse available projects  
- Search jobs  
- Apply to projects  
- View applied projects  
- Track application status  

### 🧑‍💼 Client Features
- Create profile  
- Post new projects  
- Edit/Delete projects  
- View applicants for each project  
- Manage posted projects  
- Select freelancers  

---

---

# 🔒 Security Audit Checklist

## Backend Security
- CORS configuration verification  
- JWT token expiration & secret strength  
- Password hashing validation (bcrypt)  
- Input validation on all routes  
- MongoDB query safety  
- Resume upload protection  
- Rate limiting implementation  
- Prevent sensitive data exposure in API responses  

## Frontend Security
- XSS prevention  
- Secure token storage strategy  
- Protected route validation  
- API endpoint exposure review  
- Proper use of environment variables  

---

# 🧠 Logic Audit Checklist

## Authentication Flow
- Login & Registration validation  
- Profile completion enforcement  
- Protected route logic verification  
- Token handling consistency  

## Data Flow
- Profile creation saves correctly in database  
- Project CRUD operations working properly  
- Resume upload handling validation  
- User data sync between frontend & backend  

## Route Protection
- Sensitive routes require authentication  
- Profile completion required before job access  
- Role-based access ready for future extension  

---


# 📁 Profile System
- Profile completion required before accessing job features  
- Stores:
  - Skills  
  - Experience  
  - Resume  
  - Personal details
  - Video of self introduction
- Profile data saved in MongoDB  

---

# 📦 Project Management
- Clients can:
  - Post projects  
  - Manage project listings  

- Freelancers can:
  - Search projects  
  - Apply to jobs  

- Role-based project visibility implemented  

---

# 🔒 Route Protection
Protected pages include:
- Dashboard  
- Profile  
- Job listings  
- Project posting  

Access controlled using:
- JWT authentication  
- Role validation  

---

## 🔐 System Flow
Authentication → Role Detection → Redirect to Role-Based Dashboard → Protected Feature Access

---

# 🛠️ Tech Stack

## Frontend
- React.js  
- React Router DOM  
- React Bootstrap  
- Axios  

## Backend
- Node.js  
- Express.js  
- MongoDB & Mongoose  
- JWT Authentication  
- Bcrypt.js  
- Multer (File Uploads)
- Helmet (Prevent XSS) 
---

---

# 💡 Future Enhancements
- Payment integration  
- Real-time chat system  
---

# 👩‍💻 Author
**Thanusha**  
Aspiring MERN Stack Developer  
India  

---




