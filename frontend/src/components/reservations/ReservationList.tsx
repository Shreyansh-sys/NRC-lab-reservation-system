import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  CalendarToday,
  Delete,
  Edit,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { reservationService } from '../../services/reservations';
import { Reservation } from '../../types/reservation';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
const LAB_TIMEZONE = 'America/Chicago'; // Texas timezone


const ReservationList: React.FC = () => {
  const {
    data: reservations = [],
    isLoading,
    error,
  } = useQuery({ 
  queryKey: ['categories'], 
  queryFn: reservationService.getReservations, 
})

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'active': return 'info';
      case 'completed': return 'default';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    if (!status) return 'Unknown';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleCancelReservation = async (reservationId: number) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      try {
        await reservationService.cancelReservation(reservationId);
        // React Query will refetch the data
      } catch (error) {
        alert('Failed to cancel reservation');
      }
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Error loading reservations: {(error as Error).message}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        My Reservations
      </Typography>
      <Alert severity="info" sx={{ mb: 2 }}>
        All times shown in Central Time (Texas)
      </Alert>

      {reservations.length === 0 ? (
        <Alert severity="info">
          You don't have any reservations yet. Browse equipment to make your first reservation!
        </Alert>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {reservations.map((reservation: Reservation) => (
            <Paper key={reservation.id} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {reservation.equipment_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {reservation.equipment_details?.location || 'Location not specified'}
                  </Typography>
                </Box>
                <Chip
                  label={getStatusText(reservation.status)}
                  color={getStatusColor(reservation.status) as any}
                />
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarToday fontSize="small" />
                  <Typography variant="body2">
                    <strong>Date:</strong> {dayjs.utc(reservation.start_time).tz(LAB_TIMEZONE).format('MMM D, YYYY')}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2">
                    <strong>Time:</strong> {dayjs(reservation.start_time).format('h:mm A')} - {dayjs(reservation.end_time).format('h:mm A')}
                  </Typography>
                </Box>
              </Box>

              {reservation.purpose && (
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Purpose:</strong> {reservation.purpose}
                </Typography>
              )}

              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                {reservation.status === 'confirmed' && (
                  <Button
                    size="small"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleCancelReservation(reservation.id)}
                  >
                    Cancel
                  </Button>
                )}
                <Button size="small" startIcon={<Edit />} variant="outlined">
                  Details
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ReservationList;