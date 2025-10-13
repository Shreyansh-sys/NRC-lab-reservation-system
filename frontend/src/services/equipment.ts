import { api } from './api';
import { Equipment, EquipmentCategory } from '../types/equipment';

export const equipmentService = {
  // Get all equipment with optional filters
  getEquipment: async (filters?: {
    category?: number | string;
    status?: string;
    location?: string;
    search?: string;
  }): Promise<Equipment[]> => {
    const params = new URLSearchParams();
    
    if (filters?.category) params.append('category', filters.category.toString());
    if (filters?.status) params.append('status', filters.status);
    if (filters?.location) params.append('location', filters.location);
    if (filters?.search) params.append('search', filters.search);
    
    const response = await api.get(`/equipment/?${params}`);
    return response.data;
  },

  // Get equipment by ID
  getEquipmentById: async (id: number): Promise<Equipment> => {
    const response = await api.get(`/equipment/${id}/`);
    return response.data;
  },

  // Get all categories
  getCategories: async (): Promise<EquipmentCategory[]> => {
    const response = await api.get('/categories/');
    return response.data;
  },

  // Check equipment availability
  checkAvailability: async (equipmentId: number, startTime: string, endTime: string) => {
    const response = await api.get(
      `/equipment/${equipmentId}/availability/?start_time=${startTime}&end_time=${endTime}`
    );
    return response.data;
  },
};