import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: "customer" | "admin" | string;
  avatar?: string;
  phone?: string;
  address?: string;
  createdAt?: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password?: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; user?: User; error?: string }>;
  logout: () => void;
  updateUser: (updatedFields: Partial<User>) => void;
  clearError: () => void;
}

const STORAGE_KEY_USER = "ylp_auth_user";
const STORAGE_KEY_TOKEN = "ylp_auth_token";
const STORAGE_KEY_USERS_DB = "ylp_registered_users";

// Default mock users in case database is empty
const INITIAL_DEMO_USERS: (User & { password?: string })[] = [
  {
    id: "user-demo-1",
    firstName: "Grace",
    lastName: "Adeyemi",
    email: "grace@ylpstores.com",
    password: "password123",
    role: "customer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
    phone: "+234 801 234 5678",
    createdAt: new Date().toISOString(),
  },
  {
    id: "admin-demo-1",
    firstName: "Store",
    lastName: "Admin",
    email: "admin@ylpstores.com",
    password: "adminpassword",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
    createdAt: new Date().toISOString(),
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to safely read from localStorage
const getStoredData = <T,>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return defaultValue;
  }
};

// Helper function to safely write to localStorage
const setStoredData = <T,>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key} to localStorage:`, err);
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize Auth state from LocalStorage on mount
  useEffect(() => {
    try {
      // Initialize registered users DB in localStorage if empty
      const existingUsers = getStoredData<(User & { password?: string })[]>(STORAGE_KEY_USERS_DB, []);
      if (existingUsers.length === 0) {
        setStoredData(STORAGE_KEY_USERS_DB, INITIAL_DEMO_USERS);
      }

      // Restore session user
      const storedUser = getStoredData<User | null>(STORAGE_KEY_USER, null);
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (err) {
      console.error("Failed to load auth session from localStorage:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Login handler
  const login = async (email: string, password?: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      const cleanEmail = email.trim().toLowerCase();
      const usersDb = getStoredData<(User & { password?: string })[]>(STORAGE_KEY_USERS_DB, INITIAL_DEMO_USERS);

      // Find user matching email
      let matchedUser = usersDb.find((u) => u.email.toLowerCase() === cleanEmail);

      // Validate password if user was found in database
      if (matchedUser && password && matchedUser.password && matchedUser.password !== password) {
        const errMsg = "Invalid email or password.";
        setError(errMsg);
        setIsLoading(false);
        return { success: false, error: errMsg };
      }

      // If user is not found, auto-generate a user profile for standard/social login
      if (!matchedUser) {
        const nameParts = cleanEmail.split("@")[0].split(".");
        const firstName = nameParts[0] ? nameParts[0].charAt(0).toUpperCase() + nameParts[0].slice(1) : "User";
        const lastName = nameParts[1] ? nameParts[1].charAt(0).toUpperCase() + nameParts[1].slice(1) : "Member";

        const newUser: User & { password?: string } = {
          id: `user-${Date.now()}`,
          firstName,
          lastName,
          email: cleanEmail,
          password: password || "password",
          role: "customer",
          createdAt: new Date().toISOString(),
        };

        usersDb.push(newUser);
        setStoredData(STORAGE_KEY_USERS_DB, usersDb);
        matchedUser = newUser;
      }

      // Remove sensitive password from active user session object
      const { password: _p, ...activeUser } = matchedUser;

      // Generate mock session token
      const token = `token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

      // Save to localStorage
      setStoredData(STORAGE_KEY_USER, activeUser);
      setStoredData(STORAGE_KEY_TOKEN, token);

      // Update state
      setUser(activeUser);
      setIsLoading(false);

      return { success: true, user: activeUser };
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "An unexpected error occurred during login.";
      setError(errMsg);
      setIsLoading(false);
      return { success: false, error: errMsg };
    }
  };

  // Register handler
  const register = async (data: RegisterData): Promise<{ success: boolean; user?: User; error?: string }> => {
    setIsLoading(true);
    setError(null);

    try {
      const cleanEmail = data.email.trim().toLowerCase();
      const usersDb = getStoredData<(User & { password?: string })[]>(STORAGE_KEY_USERS_DB, INITIAL_DEMO_USERS);

      // Check if user already exists
      const existingUser = usersDb.find((u) => u.email.toLowerCase() === cleanEmail);
      if (existingUser) {
        const errMsg = "An account with this email address already exists.";
        setError(errMsg);
        setIsLoading(false);
        return { success: false, error: errMsg };
      }

      // Create new user object
      const newUserRecord: User & { password?: string } = {
        id: `user-${Date.now()}`,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: cleanEmail,
        password: data.password || "",
        role: data.role || "customer",
        createdAt: new Date().toISOString(),
      };

      // Add to mock database in localStorage
      usersDb.push(newUserRecord);
      setStoredData(STORAGE_KEY_USERS_DB, usersDb);

      // Session user object without password
      const { password: _p, ...activeUser } = newUserRecord;
      const token = `token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

      // Save session in localStorage
      setStoredData(STORAGE_KEY_USER, activeUser);
      setStoredData(STORAGE_KEY_TOKEN, token);

      // Update active state
      setUser(activeUser);
      setIsLoading(false);

      return { success: true, user: activeUser };
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "An unexpected error occurred during registration.";
      setError(errMsg);
      setIsLoading(false);
      return { success: false, error: errMsg };
    }
  };

  // Logout handler
  const logout = (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY_USER);
      localStorage.removeItem(STORAGE_KEY_TOKEN);
    } catch (err) {
      console.error("Error clearing user from localStorage:", err);
    }
    setUser(null);
    setError(null);
  };

  // Update profile / user data
  const updateUser = (updatedFields: Partial<User>): void => {
    if (!user) return;

    const updatedUser: User = { ...user, ...updatedFields };

    // Update in session localStorage
    setStoredData(STORAGE_KEY_USER, updatedUser);

    // Update in registered users database in localStorage
    const usersDb = getStoredData<(User & { password?: string })[]>(STORAGE_KEY_USERS_DB, []);
    const updatedUsersDb = usersDb.map((u) => (u.id === user.id ? { ...u, ...updatedFields } : u));
    setStoredData(STORAGE_KEY_USERS_DB, updatedUsersDb);

    setUser(updatedUser);
  };

  // Clear error state
  const clearError = (): void => {
    setError(null);
  };

  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
        updateUser,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
