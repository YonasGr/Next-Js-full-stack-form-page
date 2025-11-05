export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Email validation regex - strict pattern to avoid ReDoS vulnerability
// Limits local and domain parts to prevent exponential backtracking
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Username validation: 3-20 characters, alphanumeric and underscore
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

export function validateUsername(username: string): string | null {
  if (!username || username.trim().length === 0) {
    return 'Username is required';
  }
  
  if (!usernameRegex.test(username)) {
    return 'Username must be 3-20 characters and contain only letters, numbers, and underscores';
  }
  
  return null;
}

export function validateEmail(email: string): string | null {
  if (!email || email.trim().length === 0) {
    return 'Email is required';
  }
  
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password || password.length === 0) {
    return 'Password is required';
  }
  
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  
  return null;
}

export function validateFullName(fullName: string): string | null {
  if (!fullName || fullName.trim().length === 0) {
    return 'Full name is required';
  }
  
  if (fullName.trim().length < 2) {
    return 'Full name must be at least 2 characters long';
  }
  
  return null;
}

export function validateRegistrationForm(data: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}): ValidationResult {
  const errors: ValidationError[] = [];
  
  const usernameError = validateUsername(data.username);
  if (usernameError) {
    errors.push({ field: 'username', message: usernameError });
  }
  
  const emailError = validateEmail(data.email);
  if (emailError) {
    errors.push({ field: 'email', message: emailError });
  }
  
  const passwordError = validatePassword(data.password);
  if (passwordError) {
    errors.push({ field: 'password', message: passwordError });
  }
  
  if (data.password !== data.confirmPassword) {
    errors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
  }
  
  const fullNameError = validateFullName(data.fullName);
  if (fullNameError) {
    errors.push({ field: 'fullName', message: fullNameError });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateLoginForm(data: {
  identifier: string;
  password: string;
}): ValidationResult {
  const errors: ValidationError[] = [];
  
  if (!data.identifier || data.identifier.trim().length === 0) {
    errors.push({ field: 'identifier', message: 'Username or email is required' });
  }
  
  if (!data.password || data.password.length === 0) {
    errors.push({ field: 'password', message: 'Password is required' });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}
