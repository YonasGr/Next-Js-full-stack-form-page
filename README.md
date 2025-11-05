# Next.js Full-Stack User Registration Form

A professional, full-stack user registration form built with Next.js 14, featuring comprehensive form validation, SQLite database integration, and modern styling with Tailwind CSS.

## 🌟 Features

- **Full-Stack Application**: Built with Next.js 14 (App Router) for both frontend and backend
- **Form Validation**: 
  - Client-side validation for immediate feedback
  - Server-side validation for security
  - Real-time error messages
- **Local Database**: SQLite database for storing user data
- **Modern UI**: Responsive design with Tailwind CSS
- **TypeScript**: Fully typed for better development experience
- **Security Best Practices**: Input sanitization and validation
- **Dark Mode Support**: Automatic dark mode based on system preferences

## 📋 Form Fields & Validation Rules

| Field | Validation Rules |
|-------|-----------------|
| Full Name | Required, minimum 2 characters |
| Username | Required, 3-20 characters, alphanumeric and underscore only |
| Email | Required, valid email format |
| Password | Required, minimum 8 characters, must include uppercase, lowercase, and number |
| Confirm Password | Must match password field |

## 🏗️ Project Structure

```
Next-Js-full-stack-form-page/
├── app/                          # Next.js App Router directory
│   ├── api/                      # API routes (backend)
│   │   └── register/
│   │       └── route.ts          # User registration endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Home page
├── components/                   # React components
│   └── RegistrationForm.tsx      # Main registration form component
├── lib/                          # Utility libraries
│   ├── database.ts               # SQLite database setup and queries
│   └── validation.ts             # Form validation logic
├── node_modules/                 # Dependencies (auto-generated)
├── .gitignore                    # Git ignore file
├── next.config.js                # Next.js configuration
├── package.json                  # Project dependencies
├── postcss.config.js             # PostCSS configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## 🛠️ How It Works

### Frontend (Client-Side)
1. **User Interface**: The registration form (`components/RegistrationForm.tsx`) provides an intuitive interface
2. **Real-time Validation**: As users type, errors are cleared for a better UX
3. **Form Submission**: Data is sent to the API endpoint via a POST request
4. **Feedback**: Success or error messages are displayed to the user

### Backend (Server-Side)
1. **API Route**: `/app/api/register/route.ts` handles POST requests
2. **Validation**: Server validates all input using `lib/validation.ts`
3. **Database Check**: Checks if username/email already exists
4. **User Creation**: Stores user data in SQLite database via `lib/database.ts`
5. **Response**: Returns success or error response to the client

### Database
- **SQLite**: Lightweight, file-based database (`users.db`)
- **Schema**: Users table with id, username, email, password, full_name, and created_at
- **Auto-initialization**: Database and table are created automatically on first run

## 🚀 Prerequisites

Before running this project, make sure you have the following installed:

### For Windows:
1. **Node.js** (v18.17 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **Git** (optional, for cloning)
   - Download from: https://git-scm.com/download/win

3. **Visual Studio Build Tools** (for better-sqlite3)
   - Download from: https://visualstudio.microsoft.com/downloads/
   - Install "Desktop development with C++" workload
   - OR use: `npm install --global windows-build-tools` (run PowerShell as Administrator)

### For Linux (Ubuntu/Debian):
```bash
# Update package list
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Install build essentials (for better-sqlite3)
sudo apt install build-essential python3

# Verify installation
node --version
npm --version
```

### For Linux (Fedora/RHEL):
```bash
# Install Node.js and npm
sudo dnf install nodejs npm

# Install development tools
sudo dnf groupinstall "Development Tools"
sudo dnf install python3

# Verify installation
node --version
npm --version
```

### For macOS:
```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Verify installation
node --version
npm --version
```

## 📥 Installation & Setup

### Option 1: Clone from GitHub
```bash
# Clone the repository
git clone https://github.com/YonasGr/Next-Js-full-stack-form-page.git

# Navigate to project directory
cd Next-Js-full-stack-form-page

# Install dependencies
npm install
```

### Option 2: Download ZIP
1. Download the project as ZIP from GitHub
2. Extract the ZIP file
3. Open terminal/command prompt in the extracted folder
4. Run: `npm install`

## 🎯 Running the Application

### Development Mode (Recommended for Testing)
```bash
# Start the development server
npm run dev
```

The application will be available at: **http://localhost:3000**

### Production Mode
```bash
# Build the application
npm run build

# Start the production server
npm start
```

## 💻 Usage

1. **Start the application** using `npm run dev`
2. **Open your browser** and navigate to `http://localhost:3000`
3. **Fill in the registration form** with your details:
   - Full Name (e.g., "John Doe")
   - Username (e.g., "johndoe123")
   - Email (e.g., "john@example.com")
   - Password (e.g., "MyPassword123")
   - Confirm Password (same as password)
4. **Click "Register"** to submit the form
5. **View feedback**: Success message or error details will be displayed

## 🧪 Testing the Application

### Manual Testing:
1. **Test validation errors**:
   - Try submitting empty fields
   - Use invalid email format
   - Use weak password
   - Mismatched passwords

2. **Test duplicate prevention**:
   - Register a user
   - Try registering with the same username or email

3. **Test successful registration**:
   - Fill valid data
   - Check success message
   - Try registering again with different credentials

### Database Verification:
The user data is stored in `users.db` file in the project root. You can inspect it using any SQLite browser:
- [DB Browser for SQLite](https://sqlitebrowser.org/) (Windows/Linux/Mac)
- Or use command line: `sqlite3 users.db` then `SELECT * FROM users;`

## 🔧 Configuration

### Database Location
By default, the database is created at `./users.db`. To change this, modify `lib/database.ts`:
```typescript
const dbPath = path.join(process.cwd(), 'your-custom-path.db');
```

### Port Configuration
To change the default port (3000), create a `.env.local` file:
```
PORT=3001
```

## 🔒 Security Notes

⚠️ **Important**: This is a demonstration project. For production use, consider:

1. **Password Hashing**: Currently passwords are stored as plain text. Use bcrypt or argon2:
   ```bash
   npm install bcrypt
   ```

2. **Environment Variables**: Store sensitive data in `.env.local`

3. **HTTPS**: Use HTTPS in production

4. **Rate Limiting**: Add rate limiting to prevent abuse

5. **CSRF Protection**: Implement CSRF tokens for forms

6. **Input Sanitization**: Additional sanitization for XSS prevention

## 🐛 Troubleshooting

### Issue: "better-sqlite3" installation fails
**Solution**: 
- Windows: Install Visual Studio Build Tools or windows-build-tools
- Linux: Install build-essential and python3
- Try: `npm rebuild better-sqlite3`

### Issue: Port 3000 already in use
**Solution**: 
- Kill the process using port 3000
- Or change the port: `PORT=3001 npm run dev`

### Issue: Module not found errors
**Solution**: 
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors
**Solution**: 
```bash
# Regenerate TypeScript definitions
npm run dev
# Wait for Next.js to generate types
```

## 📚 Technologies Used

- **Next.js 14**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS 4**: Utility-first CSS framework
- **better-sqlite3**: Fast SQLite3 bindings for Node.js
- **PostCSS**: CSS preprocessor
- **Autoprefixer**: CSS vendor prefixing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Created as a demonstration of Next.js full-stack capabilities.

## 📞 Support

If you encounter any issues or have questions:
1. Check the Troubleshooting section
2. Review the project structure
3. Open an issue on GitHub

---

**Happy Coding! 🚀**
