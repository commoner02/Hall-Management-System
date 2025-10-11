const API_BASE_URL = 'https://hall-dining-management-system.vercel.app/api/v1';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

// User types
export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'student';
  mealStatus: 'On' | 'Off';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserData {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'manager' | 'student';
}

// Meal types
export interface MealItem {
  item: string;
  price: number;
  quantity: number;
}

export interface Meal {
  _id: string;
  type: string;
  items: MealItem[];
  meals: string[];
  date: string;
  createdAt: string;
}

export interface CreateMealData {
  type: string;
  items: MealItem[];
  meals: string[];
}

export interface UpdateMealData {
  items: MealItem[];
}

// Summary types
export interface Summary {
  _id: string;
  date: string;
  mealRate: number;
  totalMoney: number;
  totalMeal: number;
  createdAt: string;
}

export interface CreateSummaryData {
  mealRate: number;
}

// API functions
export const api = {
  // User endpoints
  async login(credentials: LoginCredentials): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  async logout(): Promise<ApiResponse<null>> {
    const response = await fetch(`${API_BASE_URL}/user/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return response.json();
  },

  async getMe(): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/user/getme`, {
      credentials: 'include',
    });
    return response.json();
  },

  async getAllUsers(): Promise<ApiResponse<User[]>> {
    const response = await fetch(`${API_BASE_URL}/user/`, {
      credentials: 'include',
    });
    return response.json();
  },

  async register(data: RegisterData): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async updateUser(data: UpdateUserData): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/user/update`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async updateMealStatus(id: string, mealStatus: string ): Promise<ApiResponse<User>> {
    const response = await fetch(`${API_BASE_URL}/user/update-meal`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        id,
        mealStatus
      }),
    });
    return response.json();
  },

  // Meal endpoints
  async createMeal(data: CreateMealData): Promise<ApiResponse<Meal>> {
    const response = await fetch(`${API_BASE_URL}/meal`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async updateMeal(id: string, data: UpdateMealData): Promise<ApiResponse<Meal>> {
    const response = await fetch(`${API_BASE_URL}/meal/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async getAllMeals(): Promise<ApiResponse<Meal[]>> {
    const response = await fetch(`${API_BASE_URL}/meal/`, {
      credentials: 'include',
    });
    return response.json();
  },

  async getMealByDate(date: string): Promise<ApiResponse<Meal>> {
    const response = await fetch(`${API_BASE_URL}/meal/date/${date}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    console.log(response)
    return response.json();
  },

  // Summary endpoints
  async createSummary(data: CreateSummaryData): Promise<ApiResponse<Summary>> {
    const response = await fetch(`${API_BASE_URL}/summary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return response.json();
  },

  async getSummaryByDate(date: string): Promise<ApiResponse<Summary>> {
    const response = await fetch(`${API_BASE_URL}/summary/${date}`, {
      credentials: 'include',
    });
    return response.json();
  },
};
