import React from 'react';
import {
    Box,
    Typography,
    Paper,
    Chip,
    Alert,
    CircularProgress,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { reservationService } from '../../services/reservations';
import { Reservation } from '../../types/reservation';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
const LAB_TIMEZONE = 'America/Chicago'; // Texas timezone

const AllReservationsList: React.FC = () => {
    const {
        data: reservations = [],
        isLoading,
        error,
    } = useQuery({
        queryKey: ['all-reservations'],
        queryFn: () => reservationService.getAllReservations(), // 👈 Need to create this service
    });

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
                Error loading all reservations: {(error as Error).message}
            </Alert>
        );
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                All Reservations
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Viewing all reservations in the system
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
                All times shown in Central Time (Texas)
            </Alert>

            {reservations.length === 0 ? (
                <Alert severity="info">
                    No reservations found in the system.
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
                                        Reserved by: {reservation.user_name || 'Unknown user'} { }                  </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {reservation.equipment_details?.location || 'Location not specified'}
                                    </Typography>
                                </Box>
                                <Chip
                                    label={reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                                    color={getStatusColor(reservation.status) as any}
                                />
                            </Box>

                            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2, mb: 2 }}>
                                <Typography variant="body2">
                                    <strong>Date:</strong> {dayjs.utc(reservation.start_time).tz(LAB_TIMEZONE).format('MMM D, YYYY')}
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Time:</strong> {dayjs.utc(reservation.start_time).tz(LAB_TIMEZONE).format('h:mm A')} - {dayjs.utc(reservation.end_time).tz(LAB_TIMEZONE).format('h:mm A')}
                                </Typography>
                            </Box>

                            {reservation.purpose && (
                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    <strong>Purpose:</strong> {reservation.purpose}
                                </Typography>
                            )}
                        </Paper>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default AllReservationsList;