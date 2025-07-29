import { 
  User, 
  UserCreate, 
  Business, 
  BusinessCreate, 
  Service, 
  ServiceCreate, 
  Booking, 
  BookingCreate, 
  AuthCredentials, 
  AuthToken 
} from '@/types/api';

const API_BASE_URL = 'http://localhost:8080';

class ApiService {
  private token: string | null = null;

  constructor() {
    // Load token from localStorage on initialization
    this.token = localStorage.getItem('auth_token');
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  }

  // Auth Methods
  async login(credentials: AuthCredentials): Promise<AuthToken> {
    const result = await this.request<AuthToken>('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    this.token = result.token;
    localStorage.setItem('auth_token', result.token);
    return result;
  }

  async signUp(userData: UserCreate): Promise<AuthToken> {
    const result = await this.request<AuthToken>('/users/sign-up', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    this.token = result.token;
    localStorage.setItem('auth_token', result.token);
    return result;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // User Methods
  async getUsers(): Promise<User[]> {
    return this.request<User[]>('/users');
  }

  async getUserById(id: string): Promise<User> {
    return this.request<User>(`/users/${id}`);
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/users/me');
  }

  async createUser(userData: UserCreate): Promise<void> {
    return this.request<void>('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Business Methods
  async getBusinesses(): Promise<Business[]> {
    return this.request<Business[]>('/businesses');
  }

  async getMyBusinesses(): Promise<Business[]> {
    return this.request<Business[]>('/businesses/my');
  }

  async getBusinessById(id: string): Promise<Business> {
    return this.request<Business>(`/businesses/${id}`);
  }

  async createBusiness(businessData: BusinessCreate): Promise<void> {
    return this.request<void>('/businesses', {
      method: 'POST',
      body: JSON.stringify(businessData),
    });
  }

  async updateBusiness(id: string, businessData: Partial<BusinessCreate>): Promise<void> {
    return this.request<void>(`/businesses/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, ...businessData }),
    });
  }

  async deleteBusiness(id: string): Promise<void> {
    return this.request<void>(`/businesses/${id}`, {
      method: 'DELETE',
    });
  }

  // Service Methods
  async getServices(): Promise<Service[]> {
    return this.request<Service[]>('/services');
  }

  async getServiceById(id: string): Promise<Service> {
    return this.request<Service>(`/services/${id}`);
  }

  async createService(serviceData: ServiceCreate): Promise<void> {
    return this.request<void>('/services', {
      method: 'POST',
      body: JSON.stringify(serviceData),
    });
  }

  async updateService(id: string, serviceData: Partial<ServiceCreate>): Promise<void> {
    return this.request<void>(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, ...serviceData }),
    });
  }

  async deleteService(id: string): Promise<void> {
    return this.request<void>(`/services/${id}`, {
      method: 'DELETE',
    });
  }

  // Booking Methods
  async getBookings(): Promise<Booking[]> {
    return this.request<Booking[]>('/bookings');
  }

  async getBookingById(id: string): Promise<Booking> {
    return this.request<Booking>(`/bookings/${id}`);
  }

  async createBooking(bookingData: BookingCreate): Promise<void> {
    return this.request<void>('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async updateBookingStatus(id: string, status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'): Promise<void> {
    return this.request<void>(`/bookings/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async acceptBooking(id: string): Promise<void> {
    return this.request<void>(`/bookings/${id}/accept`, {
      method: 'PUT',
    });
  }

  async cancelBooking(id: string): Promise<void> {
    return this.request<void>(`/bookings/${id}/cancel`, {
      method: 'PUT',
    });
  }

  async deleteBooking(id: string): Promise<void> {
    return this.request<void>(`/bookings/${id}`, {
      method: 'DELETE',
    });
  }

  // Password Methods
  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    return this.request<void>('/users/passwords', {
      method: 'PUT',
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });
  }

  async requestPasswordReset(email: string): Promise<void> {
    return this.request<void>('/users/passwords/reset', {
      method: 'PUT',
      body: JSON.stringify({ email }),
    });
  }
}

export const apiService = new ApiService();