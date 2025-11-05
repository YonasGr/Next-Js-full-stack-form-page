import Database from 'better-sqlite3';
import path from 'path';

// Initialize database
const dbPath = path.join(process.cwd(), 'users.db');
const db = new Database(dbPath);

// Create users table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  full_name: string;
  created_at?: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  full_name: string;
  created_at: string;
}

// Create a new user
export function createUser(user: Omit<User, 'id' | 'created_at'>): UserResponse {
  const stmt = db.prepare(`
    INSERT INTO users (username, email, password, full_name)
    VALUES (?, ?, ?, ?)
  `);
  
  const result = stmt.run(user.username, user.email, user.password, user.full_name);
  
  const newUser = db.prepare('SELECT id, username, email, full_name, created_at FROM users WHERE id = ?').get(result.lastInsertRowid) as UserResponse;
  
  return newUser;
}

// Check if username exists
export function usernameExists(username: string): boolean {
  const stmt = db.prepare('SELECT COUNT(*) as count FROM users WHERE username = ?');
  const result = stmt.get(username) as { count: number };
  return result.count > 0;
}

// Check if email exists
export function emailExists(email: string): boolean {
  const stmt = db.prepare('SELECT COUNT(*) as count FROM users WHERE email = ?');
  const result = stmt.get(email) as { count: number };
  return result.count > 0;
}

// Get all users (for debugging - password excluded)
export function getAllUsers(): UserResponse[] {
  const stmt = db.prepare('SELECT id, username, email, full_name, created_at FROM users');
  return stmt.all() as UserResponse[];
}

export default db;
