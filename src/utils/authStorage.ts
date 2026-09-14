export interface RegisteredUser {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
}

const REGISTERED_USERS_KEY = 'ylp_registered_users';
const CURRENT_USER_KEY = 'ylp_current_user';

/**
 * Retrieve all registered users stored in localStorage
 */
export const getRegisteredUsers = (): RegisteredUser[] => {
  try {
    const data = localStorage.getItem(REGISTERED_USERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading registered users from localStorage:', e);
    return [];
  }
};

/**
 * Save a new user registration to localStorage
 */
export const registerUserInLocalStorage = (user: {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}): { success: boolean; error?: string; user?: RegisteredUser } => {
  const users = getRegisteredUsers();
  const normalizedEmail = user.email.trim().toLowerCase();

  const existingUser = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existingUser) {
    return {
      success: false,
      error: 'An account with this email address already exists in local storage. Please log in.'
    };
  }

  const newUser: RegisteredUser = {
    id: 'usr-' + Date.now(),
    firstName: user.firstName.trim(),
    lastName: user.lastName.trim(),
    name: `${user.firstName.trim()} ${user.lastName.trim()}`.trim(),
    email: normalizedEmail,
    password: user.password,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  try {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  } catch (e) {
    console.error('Error saving user to localStorage:', e);
    return {
      success: false,
      error: 'Failed to write registration data to local storage. Storage limit may be exceeded.'
    };
  }
};

/**
 * Set the currently logged-in user in localStorage
 */
export const setCurrentUser = (user: RegisteredUser | null) => {
  try {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (e) {
    console.error('Error setting current user in localStorage:', e);
  }
};

/**
 * Get the currently logged-in user from localStorage
 */
export const getCurrentUser = (): RegisteredUser | null => {
  try {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

/**
 * Authenticate a user against localStorage users
 */
export const loginUserInLocalStorage = (
  email: string,
  password?: string
): { success: boolean; error?: string; user?: RegisteredUser } => {
  const users = getRegisteredUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (user) {
    if (user.password && password && user.password !== password) {
      return { success: false, error: 'Incorrect email or password.' };
    }
    setCurrentUser(user);
    return { success: true, user };
  } else {
    // If not previously registered in array, create session entry
    const newUser: RegisteredUser = {
      id: 'usr-' + Date.now(),
      firstName: normalizedEmail.split('@')[0],
      lastName: '',
      name: normalizedEmail.split('@')[0],
      email: normalizedEmail,
      createdAt: new Date().toISOString()
    };
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  }
};

/**
 * Log out the currently authenticated user by clearing localStorage session
 */
export const logout = (): void => {
  setCurrentUser(null);
};

