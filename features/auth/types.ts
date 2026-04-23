export interface RegisterRequest {
  fullName: string;
  phone: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  phone: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  status: string;
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
  avatar: string;
}
