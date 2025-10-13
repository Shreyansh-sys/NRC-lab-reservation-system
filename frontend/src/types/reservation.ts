export interface Reservation {
  id: number;
  user: number;
  user_name: string;
  equipment: number;
  equipment_name: string;
  equipment_details: {
    id: number;
    name: string;
    location: string;
    requires_training: boolean;
  };
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled' | 'no_show';
  purpose: string;
  is_recurring: boolean;
  recurring_pattern: string;
  recurring_end_date: string | null;
  created_at: string;
}

export interface CreateReservationData {
  equipment: number;
  start_time: string;
  end_time: string;
  purpose: string;
  is_recurring?: boolean;
  recurring_pattern?: string;
  recurring_end_date?: string;
}

export interface TimeSlot {
  start: Date;
  end: Date;
  available: boolean;
  reservation?: Reservation;
}

export interface AvailabilityResponse {
  available: boolean;
  conflicting_reservations: Reservation[];
}