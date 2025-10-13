import { api } from './api';
import { Reservation, CreateReservationData, AvailabilityResponse } from '../types/reservation';

export const reservationService = {
  // Get all reservations for current user
  getReservations: async (): Promise<Reservation[]> => {
    const response = await api.get('/reservations/');
    return response.data;
  },

  getAllReservations: async () => {
    const response = await api.get('/admin/reservations/'); // Matches your Django URL
    return response.data;
  },

  // Create a new reservation
  createReservation: async (data: CreateReservationData): Promise<Reservation> => {
    console.log(data);
    const response = await api.post('/reservations/', data);
    console.log(response.data);
    return response.data;
  },

  // Update a reservation
  updateReservation: async (id: number, data: Partial<CreateReservationData>): Promise<Reservation> => {
    const response = await api.put(`/reservations/${id}/`, data);
    return response.data;
  },

  // Cancel a reservation
  cancelReservation: async (id: number): Promise<void> => {
    await api.put(`/reservations/${id}/cancel/`);
  },

  // Delete a reservation
  deleteReservation: async (id: number): Promise<void> => {
    await api.delete(`/reservations/${id}/`);
  },

  // Check equipment availability
  checkAvailability: async (equipmentId: number, startTime: string, endTime: string): Promise<AvailabilityResponse> => {
    const response = await api.get(
      `/equipment/${equipmentId}/availability/?start_time=${startTime}&end_time=${endTime}`
    );
    return response.data;
  },
};