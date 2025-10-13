// import { api } from './api';

export interface AnalyticsData {
  total_reservations: number;
  active_reservations: number;
  equipment_utilization: Array<{
    equipment_name: string;
    utilization_rate: number;
    total_hours: number;
  }>;
  monthly_stats: Array<{
    month: string;
    reservations: number;
    hours: number;
  }>;
  user_activity: Array<{
    user_name: string;
    reservation_count: number;
    total_hours: number;
  }>;
}

export const analyticsService = {
  getDashboardData: async (): Promise<AnalyticsData> => {
    // For now, we'll simulate data. Later connect to real analytics API
    return {
      total_reservations: 47,
      active_reservations: 8,
      equipment_utilization: [
        { equipment_name: 'Zeiss Electron Microscope #1', utilization_rate: 85, total_hours: 120 },
        { equipment_name: 'Olympus Confocal Microscope', utilization_rate: 72, total_hours: 98 },
        { equipment_name: 'Stratasys F370 3D Printer', utilization_rate: 65, total_hours: 87 },
        { equipment_name: 'GPU Workstation #3', utilization_rate: 90, total_hours: 156 },
      ],
      monthly_stats: [
        { month: 'Jan', reservations: 12, hours: 45 },
        { month: 'Feb', reservations: 15, hours: 52 },
        { month: 'Mar', reservations: 18, hours: 68 },
        { month: 'Apr', reservations: 22, hours: 75 },
        { month: 'May', reservations: 19, hours: 63 },
        { month: 'Jun', reservations: 25, hours: 89 },
      ],
      user_activity: [
        { user_name: 'researcher_sarah', reservation_count: 15, total_hours: 45 },
        { user_name: 'labmanager_john', reservation_count: 12, total_hours: 38 },
        { user_name: 'student_mike', reservation_count: 8, total_hours: 22 },
        { user_name: 'professor_li', reservation_count: 6, total_hours: 18 },
      ],
    };
  },
};