// Types based on your OpenAPI specification
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  type: 'ADMIN' | 'USER';
  status: 'ACTIVE' | 'BLOCKED' | 'PENDING';
}

export interface UserCreate {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  type: 'ADMIN' | 'USER';
}

export interface Business {
  id: string;
  business_name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface BusinessCreate {
  business_name: string;
  description: string;
}

export interface Service {
  id: string;
  service_name: string;
  description: string;
  duration_minutes: number;
  price_eur: number;
  created_at: string;
  updated_at: string;
}

export interface ServiceCreate {
  service_name: string;
  description: string;
  duration_minutes: number;
  price_eur: number;
}

export interface Booking {
  id: string;
  user_id: string;
  service_id: string;
  date_time: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  created_at: string;
  updated_at: string;
}

export interface BookingCreate {
  user_id: string;
  service_id: string;
  date_time: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthToken {
  token: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}