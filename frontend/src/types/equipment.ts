export interface EquipmentCategory {
  id: number;
  name: string;
  description: string;
}

export interface Equipment {
  id: number;
  name: string;
  description: string;
  category: number;
  category_name: string;
  specifications: Record<string, any>;
  location: string;
  status: 'available' | 'reserved' | 'maintenance' | 'out_of_service';
  image?: string;
  max_reservation_hours: number;
  requires_training: boolean;
  is_active: boolean;
  last_maintenance: string | null;
  next_maintenance: string | null;
  created_at: string;
}