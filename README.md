# MiniCal 📅

A modern, personalized daily task manager built with Next.js, featuring Google authentication and a beautiful calendar interface.

## ✨ Features

- **🔐 Secure Authentication** - Google OAuth integration via Auth0
- **📋 Task Management** - Create, edit, and organize daily tasks
- **📅 Calendar View** - Interactive calendar to visualize tasks by date
- **✅ Task Tracking** - Mark tasks as complete and track progress
- **🎯 Priority Levels** - Organize tasks by priority (low, medium, high)
- **💾 Persistent Storage** - PostgreSQL database with Prisma ORM
- **🎨 Modern UI** - Beautiful, responsive design with Tailwind CSS
- **⚡ Real-time Updates** - Instant task updates without page refresh

## 🚀 Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Radix UI components
- **Authentication**: Auth0 (NextJS Auth0)
- **Database**: PostgreSQL
- **ORM**: Prisma 5
- **Icons**: Lucide React, React Icons
- **Date Handling**: date-fns, react-calendar

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd MiniCal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory with the following variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/minical"
   
   # Auth0
   AUTH0_SECRET="your-auth0-secret"
   AUTH0_BASE_URL="http://localhost:3000"
   AUTH0_ISSUER_BASE_URL="your-auth0-issuer-url"
   AUTH0_CLIENT_ID="your-auth0-client-id"
   AUTH0_CLIENT_SECRET="your-auth0-client-secret"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
MiniCal/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── public/                    # Static assets
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Home page
│   ├── components/
│   │   ├── BeforeLogin/      # Landing page components
│   │   ├── Dashboard/        # Dashboard components
│   │   └── ui/               # Reusable UI components
│   └── lib/
│       ├── auth0.ts          # Auth0 configuration
│       └── prisma.ts         # Prisma client
├── .env.local                # Environment variables
└── package.json
```

## 🎯 Usage

### Creating a Task
1. Log in with your Google account
2. Click on a date in the calendar
3. Fill in task details (title, description, priority)
4. Click "Add Task"

### Managing Tasks
- **Complete**: Click the checkbox next to a task
- **Edit**: Click the edit icon on a task
- **Delete**: Click the delete icon on a task

### Viewing Tasks
- Tasks are displayed on the calendar with visual indicators
- Click on any date to view tasks for that day
- Completed tasks are visually distinguished from pending tasks

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🗄️ Database Schema

The application uses a single `Task` model:

```prisma
model Task {
  id          String   @id @default(uuid())
  title       String
  description String?
  date        DateTime
  completed   Boolean  @default(false)
  priority    String   @default("medium")
  userId      String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🔒 Authentication

MiniCal uses Auth0 for secure authentication with Google OAuth. Users must sign in with their Google account to access the task manager.

## 🎨 UI Components

Built with:
- **Radix UI** - Accessible component primitives
- **Tailwind CSS** - Utility-first styling
- **React Calendar** - Interactive calendar component
- **Lucide React** - Modern icon library

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Database Setup for Production

Ensure your production database is set up and the `DATABASE_URL` environment variable points to it.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Priyansh Khatri**

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Auth0 for authentication services
- Vercel for hosting platform
- All open-source contributors

---

Made with ❤️ by Priyansh Khatri
