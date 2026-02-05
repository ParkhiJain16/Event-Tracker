A full-stack MERN application that automatically scrapes public event data for Sydney, Australia, stores it in a database, and displays it in a clean, user-friendly UI. The platform includes an admin dashboard with Google OAuth authentication to review, filter, and import events.



# 🔗 Live Links

## Frontend (Netlify)
👉 https://eventtracker2026.netlify.app

## Backend API (Render)
👉 https://eventtracker-api.onrender.com

# 🧠 Project Overview
### This project demonstrates an end-to-end data pipeline:
1) Scrape events from public websites (Eventbrite – Sydney)
2) Store and update events in MongoDB
3) Display events to users in a React UI
4) Allow users to redirect to original ticket sources
5) Provide an admin dashboard for reviewing and importing events
6) Secure admin access using Google OAuth
7) Deploy frontend and backend on cloud platforms

# ⚙️ Tech Stack
## Frontend
- React (Vite)
- Axios
- Google OAuth (redirect-based)
- Deployed on Netlify
## Backend
- Node.js
- Express.js
- Mongoose
- Passport.js (Google OAuth)
- node-cron (scheduled scraping)
- Deployed on Render
## Database
- MongoDB Atlas (Cloud)
## Scraping
- Axios
- Cheerio

# 🚀 Deployment
## Backend (Render)
Node Web Service
## Environment variables:
MONGO_URI
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GOOGLE_CALLBACK_URL

## Frontend (Netlify)
Static site build using Vite
Calls backend via public API URL

# ✅ Features Checklist
Automated event scraping
Scheduled updates using cron
MongoDB storage with status tracking
Clean event listing UI
Ticket redirect with email capture
Google OAuth authentication
Admin dashboard with filters & preview
Cloud deployment (Render + Netlify)

# Author:- 
Parkhi Jain
Full-Stack Developer (MERN)
