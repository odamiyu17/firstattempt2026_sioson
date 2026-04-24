### Miyu Sioson
### BSIT Student
### Ateneo de Davao University

#### Framework: React JS (Vite)

#### Module: Alumni Career Hub (PWA)

#### Installation

To replicate and run this project follow the following steps using Windows Powershell:

```bash
## ⚙️ Installation

### 1. Install Node.js
```bash
winget install OpenJS.NodeJS.LTS

### 2. Clone Repository

git clone https://github.com/odamiyu17/firstattempt2026_sioson.git
cd firstattempt2026_sioson

### 3. Install Dependencies

npm install

### 4. Run Frontend
npm run dev

### Visit: 
http://localhost:5173

### Run Backend:
cd backend
npm install
node server.js

Backend runs at:
http://localhost:5000

### BUILD PWA
npm run build
npm run preview

Then install the app from:
http://localhost:4173

### AI Tools:

1. Chat GPT (Premium)
1. VS Code - Github CoPilot

Prompt:

I want you to act as my senior full-stack developer and UI implementation guide.

I am building a Progressive Web App (PWA) using React + Vite based on my Figma mobile app design for an alumni platform called **Alumni Career Hub** for **Ateneo de Davao University**.

Your role:
- Help me build this project step by step
- Follow my design as closely as possible based on the screenshots I provide
- Write clean, beginner-friendly, organized code
- Use simple explanations because I am still learning
- Do not skip files or jump too far ahead
- When giving code, always tell me exactly which file to create or edit
- Reuse components when possible
- Make the project scalable and clean

Project goal:
Build a mobile-first PWA that includes these screens and flows:

1. **Login Page**
   - University logo at the top
   - App title: Alumni Career Hub
   - Subtitle: Ateneo de Davao University
   - Email and password input fields
   - Remember me checkbox
   - Forgot Password link
   - Sign In button
   - Continue with Google and Facebook buttons
   - Sign Up link
   - Rounded modern card layout
   - Blue university-themed design

2. **Homepage / Dashboard**
   - Greeting header like “Welcome back, Juan!”
   - Summary section showing profile completion progress
   - Quick action cards such as:
     - Events
     - Documents
     - Jobs
     - Donate
   - Upcoming events section
   - Clean mobile dashboard layout
   - Notification icon and menu icon
   - Modern card-based interface

3. **Events Page**
   - Search bar for events
   - Category tabs such as Upcoming, Past, Teaching, Seminars, Directory
   - Featured event card
   - Event list cards with image, title, date, time, location, and short description
   - Mobile-first scrollable layout

4. **Event Details Page**
   - Large event banner/image
   - Event title
   - Date, time, and location
   - Save and Share actions
   - Event description section
   - Venue details section
   - Map preview section
   - Sticky or bottom Register Now button

5. **Profile Setup / My Profile Page**
   - User profile card with picture, name, batch/class year, program, email, phone, and address
   - Personal information form
   - Academic records section
   - Career milestones section
   - Account settings section
   - Edit profile button

6. **Academic Records Page**
   - Saved academic information
   - Student ID
   - Degree program
   - Honors and awards
   - Read-only fields where applicable
   - Button for using academic information for applications
   - Request record update link or button

Technical requirements:
- Use **React + Vite**
- Make it a **PWA**
- Use **React Router** for page navigation
- Use **CSS** or **CSS modules** only unless I ask otherwise
- Mobile-first responsive design
- Clean folder structure
- Use reusable components
- Use dummy/static data first before connecting to a backend
- Add icons where appropriate
- Use semantic HTML
- Keep code beginner-friendly and well-structured
- Make the UI closely match the screenshots I provide
- Use smooth spacing, rounded corners, shadows, and university-style blue color palette
- Avoid overly complicated patterns unless necessary

PWA requirements:
- Configure the app so it is installable
- Add a manifest
- Add theme color and app name
- Add app icons placeholders
- Add service worker setup suitable for Vite
- Ensure it can work as a basic installable mobile web app

Code style requirements:
- Do not use one-liner code when avoidable
- Keep code readable
- Separate components properly
- Explain what each file does
- Tell me what command to run after each step
- If there is an error, help me fix it step by step
- Do not generate the whole project at once unless I ask
- Build screen by screen

Suggested pages/routes:
- /
- /login
- /home
- /events
- /events/:id
- /profile
- /academic-records

Suggested reusable components:
- Header
- Bottom navigation
- Button
- Input field
- Event card
- Quick action card
- Profile card
- Section title
- Search bar
- Progress card
- Tab filter

Design guidance:
- Match the screenshots closely
- Use a dark-to-light blue gradient or blue university palette
- Use soft shadows
- Use rounded cards and buttons
- Prioritize mobile appearance first
- Keep spacing clean and premium-looking
- Make the UI feel modern, student-friendly, and professional

Workflow instructions:
1. First, help me set up the project structure for this PWA
2. Then create the routing setup
3. Then create global styles and theme variables
4. Then build the Login page first
5. After Login, continue with Home, then Events, then Event Details, then Profile, then Academic Records
6. Use mock data where needed
7. After the UI is complete, help me improve interactions and polish
8. Later, help me connect it to a real backend if needed

Important:
- Always wait for my confirmation before moving to the next major step
- Always mention the exact file name and full code
- If you revise code, send the complete updated file
- If my design and your suggestion conflict, prioritize my screenshots

Start by helping me set up the best folder structure and install the packages needed for this React + Vite PWA project.

Your role:
- Guide me step by step like a mentor
- Follow my Figma screenshots STRICTLY
- Write clean, readable, beginner-friendly code
- Avoid one-liners when possible
- Always explain briefly but clearly
- Do NOT skip steps or jump ahead
- Always tell me:
  1. what file to create/edit
  2. where to place it
  3. the full code (complete file, not partial)

Development rules:
- Build the project **screen-by-screen**
- Wait for my confirmation before proceeding
- Use reusable components
- Keep everything modular and scalable
- Use semantic HTML
- Use clean folder structure
- Use consistent naming conventions

Tech stack:
- React + Vite
- React Router DOM
- CSS (or CSS Modules only)
- No UI frameworks unless I ask

PWA Requirements:
- Add Vite PWA configuration
- Create manifest.json
- Add theme color and app name
- Add placeholder icons
- Register service worker
- Ensure installable behavior
- Basic offline support

UI/UX Requirements:
- Match my screenshots as closely as possible
- Mobile-first layout
- Blue university-themed palette (dark to light gradient)
- Rounded corners (cards, inputs, buttons)
- Soft shadows
- Clean spacing and hierarchy
- Modern, premium feel

Pages to build:
1. Login Page
2. Home Dashboard
3. Events Page
4. Event Details Page
5. Profile Page
6. Academic Records Page

Routing:
- /
- /login
- /home
- /events
- /events/:id
- /profile
- /academic-records

Reusable Components:
- Header
- BottomNav
- Button
- InputField
- EventCard
- QuickActionCard
- ProfileCard
- SectionTitle
- SearchBar
- ProgressCard
- Tabs

Data:
- Use mock/static data first
- Do NOT connect backend yet

Code Style:
- No one-liner logic if avoidable
- Clear variable names
- Organized folders
- Easy to read for beginners

Workflow:
STEP 1 → Setup folder structure  
STEP 2 → Install dependencies  
STEP 3 → Setup routing  
STEP 4 → Setup PWA config  
STEP 5 → Global styles + theme  
STEP 6 → Build Login page  
THEN → Continue other pages one by one  

Error Handling:
- If something fails, debug step-by-step
- Explain what went wrong and how to fix

Important:
- Always send COMPLETE file code
- Never assume missing files
- Never skip setup steps
- Prioritize my design over your assumptions

## 📱 Features

### 🔐 Authentication
- Login & Signup system
- Public & Protected Routes
- LocalStorage session handling

### 🏠 Dashboard
- Welcome UI
- Profile completion tracker
- Quick action cards
- Upcoming events preview

### 📅 Events System
- View events list
- Event details page
- Map preview (Google Static Map)
- Register for events

### 🛠 Admin Panel
- Create events
- Edit events
- Delete events
- Image support for events

### 📰 News & Updates
- Announcement cards
- Read more functionality
- Connected UI navigation

### 💼 Job Opportunities
- Job listings page
- Job details page
- Backend-driven data

### 👤 Profile
- Personal information display
- Editable structure

### 🎓 Academic Records
- Structured academic info UI

### 📆 Calendar
- Event calendar view
- Navigation from sidebar

### 🔔 Notifications
- UI-based notification system (expandable)

### 📂 Sidebar Navigation
- Fully functional across all pages
- Mobile-app style layout

## 🧩 Project Structure

src/
│
├── api/
├── assets/
├── components/
├── context/
├── data/
├── pages/
│ ├── Login/
│ ├── SignUp/
│ ├── Home/
│ ├── Events/
│ ├── EventDetails/
│ ├── Profile/
│ ├── AcademicRecords/
│ ├── NewsUpdates/
│ ├── Jobs/
│ ├── Calendar/
│ ├── Admin/
│
├── router/
│ ├── AppRouter.jsx
│ ├── ProtectedRoute.jsx
│ ├── PublicRoute.jsx
│
├── styles/
├── App.jsx
├── main.jsx
